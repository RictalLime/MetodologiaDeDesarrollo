import { useState } from "react";
import { supabaseClient } from "@/utils/supabase";
import { roboto, playfair_Display } from "@/utils/fonts";

export function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState("$0.00");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const agregarProducto = async () => {
    if (!codigoProducto) return;

    const { data, error } = await supabaseClient
      .from("producto")
      .select("*")
      .eq("id", codigoProducto)
      .single();

    if (error) {
      console.error("Error al buscar el producto:", error);
      return;
    }

    if (data) {
      setProductos((prevProductos) => [...prevProductos, data]);
      setCantidadTotal((prevCantidad) => prevCantidad + 1);
      setValorTotal((cantidadTotal) => {
        const precioValor = parseFloat(data.precio.replace(/[^0-9.-]+/g, ""));
        const cantidadTotalValor = parseFloat(
          cantidadTotal.replace(/[^0-9.-]+/g, "")
        );

        const nuevoTotal = precioValor + cantidadTotalValor;

        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(nuevoTotal);
      });
      setCodigoProducto("");
    }
  };

  const registrarVenta = async () => {
    const userId = localStorage.getItem("userid");

    const detallesVenta = productos.map((producto) => ({
      productoId: producto.id,
      preciounitario: producto.precio.replace(/[^0-9.-]+/g, ""),
      cantidad: 1,
    }));

    const { data, error } = await supabaseClient.rpc("registrar_venta", {
      _usuario_id: userId,
      _fecha: new Date().toISOString(),
      _total: parseFloat(valorTotal.replace(/[^0-9.-]+/g, "")),
      _json: JSON.parse(JSON.stringify(detallesVenta)),
    });

    if (error) {
      console.error("Error al registrar la venta:", error);
    } else {
      console.log("Venta registrada con éxito:", data);
      setProductos([]);
      setCantidadTotal(0);
      setValorTotal("$0.00");
      setModalMessage("¡Venta registrada con éxito!");
      setShowModal(true);
    }
  };

  function isEnter(event) {
    if (event.key === "Enter") {
      agregarProducto(event);
    }
  }

  function reiniciarCalculos() {
    setProductos([]);
    setValorTotal("$0.00");
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{modalMessage}</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario */}
      <div className="flex flex-col md:flex-row w-[80vw] justify-between mb-5">
        <h1 className={`${playfair_Display.className} text-4xl font-bold`}>
          Registrar venta
        </h1>
        <div
          className={`${roboto.className} border border-negro rounded-[20px] flex`}
        >
          <img src="/assets/search.svg" alt="Buscar" className="w-10" />
          <input
            type="text"
            placeholder="Añade el código del producto"
            value={codigoProducto}
            onChange={(e) => setCodigoProducto(e.target.value)}
            onKeyDown={isEnter}
            className={`${roboto.className} rounded-tr-[20px] rounded-br-[20px] p-2 w-[250px]`}
          />
        </div>
      </div>
      {/* Tabla y controles */}
      <table className={`${roboto.className} w-full md:w-[80vw] mt-5`}>
        <thead>
          <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
            <th className="rounded-tl-[25px]">Id</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th className="rounded-tr-[25px]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="hover:bg-azul">
              <td className="border border-negro">{producto.id}</td>
              <td className="border border-negro">{producto.nombre}</td>
              <td className="border border-negro">{producto.precio}</td>
              <td className="border border-negro">
                <button
                  className={`${roboto.className}`}
                  onClick={() =>
                    setProductos(productos.filter((p) => p.id !== producto.id))
                  }
                >
                  <img src="/delete.svg" alt="Eliminar producto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`${roboto.className} flex justify-between w-full md:w-[80vw] mt-5`}
      >
        <label>Total de artículos: {productos.length}</label>
        <label>Cajero: </label>
        <label>Id de la venta:</label>
        <label>Valor total de la venta: {valorTotal}</label>
      </div>
      <div>
        <button
          className={`${roboto.className} border border-negro rounded-[25px] bg-azul p-1 w-40`}
          onClick={registrarVenta}
        >
          Registrar
        </button>
        <button
          className={`${roboto.className} border border-negro rounded-[25px] bg-red-400 p-1 w-40`}
          onClick={reiniciarCalculos}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default RegistrarVenta;

import { useState } from "react";
import { supabaseClient } from "@/utils/supabase";
import { roboto, playfair_Display } from "@/utils/fonts";

export function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [codigoProducto, setCodigoProducto] = useState("");
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
      setProductos((prevProductos) => {
        const productoExistente = prevProductos.find((p) => p.id === data.id);

        if (productoExistente) {
          return prevProductos.map((p) =>
            p.id === data.id ? { ...p, cantidad: p.cantidad + 1 } : p
          );
        }

        return [...prevProductos, { ...data, cantidad: 1 }];
      });

      actualizarTotal(data.precio, 1);
      setCodigoProducto("");
    }
  };

  const actualizarTotal = (precio, cantidad) => {
    const precioNumerico = parseFloat(precio.replace(/[^0-9.-]+/g, ""));
    const nuevoTotal =
      parseFloat(valorTotal.replace(/[^0-9.-]+/g, "")) +
      precioNumerico * cantidad;

    setValorTotal(
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(nuevoTotal)
    );
  };

  const disminuirCantidad = (producto) => {
    setProductos((prevProductos) => {
      const productoActualizado = prevProductos.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
      );

      return productoActualizado.filter((p) => p.cantidad > 0);
    });

    actualizarTotal(producto.precio, -1);
  };

  const incrementarCantidad = (producto) => {
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );

    actualizarTotal(producto.precio, 1);
  };

  const registrarVenta = async () => {
    const userId = localStorage.getItem("userid");

    const detallesVenta = productos.map((producto) => ({
      productoId: producto.id,
      preciounitario: producto.precio.replace(/[^0-9.-]+/g, ""),
      cantidad: producto.cantidad,
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
      setValorTotal("$0.00");
      setModalMessage("¡Venta registrada con éxito!");
      setShowModal(true);
    }
  };

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
            onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
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
            <th>Cantidad</th>
            <th className="rounded-tr-[25px]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="hover:bg-azul">
              <td className="border border-negro">{producto.id}</td>
              <td className="border border-negro">{producto.nombre}</td>
              <td className="border border-negro">{producto.precio}</td>
              <td className="border border-negro">{producto.cantidad}</td>
              <td className="border border-negro flex items-center">
                <button
                  className={`${roboto.className} border border-negro rounded-[25px] bg-azul w-10`}
                  onClick={() => disminuirCantidad(producto)}
                >
                  -
                </button>
                <button
                  className={`${roboto.className} border border-negro rounded-[25px] bg-azul w-10 ml-2`}
                  onClick={() => incrementarCantidad(producto)}
                >
                  +
                </button>
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
        <label>Valor total de la venta: {valorTotal}</label>
      </div>
      <div>
        <button
          className={`${roboto.className} border border-negro rounded-[25px] bg-azul p-1 w-40`}
          onClick={registrarVenta}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

export default RegistrarVenta;

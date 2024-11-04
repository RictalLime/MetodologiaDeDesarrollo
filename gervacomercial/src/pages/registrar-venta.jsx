import { useState } from "react";
import { supabaseClient } from "@/utils/supabase";

export function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const agregarProducto = async (e) => {
    if (e.key !== "Enter") return;
    if (!codigoProducto) return;

    // Buscar el producto en la base de datos
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
      // Agregar el producto a la lista de productos
      setProductos((prevProductos) => [...prevProductos, data]);
      setCantidadTotal((prevCantidad) => prevCantidad + 1);
      setValorTotal((prevTotal) => prevTotal + data.precio);
      setCodigoProducto(""); // Limpiar el campo de búsqueda
    }
  };

  const registrarVenta = async () => {
    // Aquí puedes agregar la lógica para registrar la venta en la base de datos
    console.log("Venta registrada:", productos);
    // Limpiar la lista de productos después de registrar la venta
    setProductos([]);
    setCantidadTotal(0);
    setValorTotal(0);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Registrar venta</h1>
        <div className="border border-negro rounded-[20px] flex">
          <img src="/assets/search.svg" alt="Buscar" />
          <input
            type="text"
            placeholder="Añade el código del producto"
            value={codigoProducto}
            onChange={(e) => setCodigoProducto(e.target.value)}
            onKeyDown={agregarProducto}
            className="rounded-tr-[20px] rounded-br-[20px] p-2"
          />
        </div>
      </div>
      <table className="w-full md:w-[80vw] mt-5">
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
      <div className="flex justify-between w-full md:w-[80vw] mt-5">
        <label>Total de artículos: {productos.length}</label>
        <label>Cajero: </label>
        <label>Id de la venta:</label>
        <label>Valor total de la venta: {valorTotal}</label>
      </div>
      <div>
        <button
          className="border border-negro rounded-[25px] bg-azul p-1 w-40"
          onClick={registrarVenta}
        >
          Registrar
        </button>
        <button
          className="border border-negro rounded-[25px] bg-red-400 p-1 w-40"
          onClick={() => setProductos([])}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default RegistrarVenta;

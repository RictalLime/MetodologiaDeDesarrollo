import { useState } from 'react';
import { supabaseClient } from '@/utils/supabase';

export function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [codigoProducto, setCodigoProducto] = useState('');
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const agregarProducto = async () => {
    if (!codigoProducto) return;

    // Buscar el producto en la base de datos
    const { data, error } = await supabaseClient
      .from('productos')
      .select('*')
      .eq('id', codigoProducto)
      .single();

    if (error) {
      console.error('Error al buscar el producto:', error);
      return;
    }

    if (data) {
      // Agregar el producto a la lista de productos
      setProductos((prevProductos) => [...prevProductos, data]);
      setCantidadTotal((prevCantidad) => prevCantidad + 1);
      setValorTotal((prevTotal) => prevTotal + data.precio);
      setCodigoProducto(''); // Limpiar el campo de búsqueda
    }
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
      <div className="w-full md:w-[80vw] flex bg-azul border border-negro rounded-[20px]">
      <h1 className="w-[4%] border-r flex flex-col items-center font-semibold text-lg p-2">
        Id
      </h1>
      <h1 className="w-[18%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
        Modelo
      </h1>
      <h1 className="w-[14%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
        Precio
      </h1>
      <h1 className="w-[20%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
        Total
      </h1>
      <h1 className="w-[10%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
        
      </h1>
      </div>
      <table  className="w-full md:w-[80vw] mt-5">
      <tbody>
        {productos.map((producto) => (
        <tr key={producto.id} className="hover:bg-azul">
          <td className="border border-negro">{}</td>
          <td className="border border-negro">{}</td>
          <td className="border border-negro">{}</td>
          <td className="border border-negro">{}</td>
          <td className="border border-negro">
            <button onClick={() => setProductos(productos.filter(p => p.id !== producto.id))}>
            <img src="/delete.svg" alt="Eliminar producto"/>
            </button>
          </td>
        </tr>
        ))}
      </tbody>
      </table>
      <div className="flex justify-between w-full md:w-[80vw] mt-5">
        <label>Total de articulos: {productos.length}</label>
        <label>Cajero: </label>
        <label>Id de la venta:</label>
        <label>Valor total de la venta: 
          {productos.reduce((acc, p) => acc + p.total, 0)}
        </label>
      </div>
      <div>
      <button
          className="border border-negro rounded-[25px] bg-azul p-1 w-40"
          onClick={RegistrarVenta}
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

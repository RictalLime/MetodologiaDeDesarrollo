import { useState, useEffect } from "react";
import { supabaseClient } from "@/utils/supabase";

function ConsultarVentas() {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [openDetalleModal, setOpenDetalleModal] = useState(false);

  useEffect(() => {
    fetchVentas();
    fetchUsuarios();
    fetchProductos();
  }, []);

  const fetchVentas = async () => {
    let { data: venta, error } = await supabaseClient.from("venta").select("*");
    if (error) {
      console.error(error);
    } else {
      setVentas(venta);
    }
  };

  const fetchUsuarios = async () => {
    let { data: usuarios, error } = await supabaseClient
      .from("usuario")
      .select("id, nombre");
    if (error) {
      console.error(error);
    } else {
      setUsuarios(usuarios);
    }
  };

  const fetchProductos = async () => {
    let { data: productos, error } = await supabaseClient
      .from("producto")
      .select("id, nombre");
    if (error) {
      console.error(error);
    } else {
      setProductos(productos);
    }
  };

  const getUsuarioNombre = (usuarioId) => {
    const usuario = usuarios.find((u) => u.id === usuarioId);
    return usuario ? usuario.nombre : "Desconocido";
  };

  const getProductoNombre = (productoId) => {
    const producto = productos.find((p) => p.id === productoId);
    return producto ? producto.nombre : "Desconocido";
  };

  const handleOpenDetalle = async (folio) => {
    let { data: detalleventa, error } = await supabaseClient
      .from("detalleventa")
      .select("*")
      .eq("folioid", folio);

    if (error) {
      console.error(error);
    } else {
      setDetalleVenta(detalleventa);
      setOpenDetalleModal(true);
    }
  };

  const handleCloseDetalle = () => {
    setOpenDetalleModal(false);
    setDetalleVenta([]);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex flex-col md:flex-row w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Lista de ventas</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full md:w-[80vw] mt-5">
          <thead>
            <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
              <th className="rounded-tl-[25px]">Folio de venta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Vendedor</th>
              <th className="rounded-tr-[25px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas?.map((venta) => (
              <tr key={venta.folio} className="hover:bg-azul">
                <td className="border border-negro p-2">{venta.folio}</td>
                <td className="border border-negro p-2">{venta.fecha}</td>
                <td className="border border-negro p-2">{venta.total}</td>
                <td className="border border-negro p-2">
                  {getUsuarioNombre(venta.usuarioid)}
                </td>
                <td className="border border-negro flex justify-center">
                  <button
                    className="border border-negro rounded-[25px] bg-green-300 p-1 m-1"
                    onClick={() => handleOpenDetalle(venta.folio)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openDetalleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-[80vw] max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Detalles de la venta</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-2">Folio</th>
                  <th className="border p-2">Producto</th>
                  <th className="border p-2">Precio unitario</th>
                  <th className="border p-2">Cantidad</th>
                  <th className="border p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalleVenta.map((detalle) => (
                  <tr key={detalle.id}>
                    <td className="border p-2">{detalle.folioid}</td>
                    <td className="border p-2">
                      {getProductoNombre(detalle.productoid)}
                    </td>
                    <td className="border p-2">{detalle.preciounitario}</td>
                    <td className="border p-2">{detalle.cantidad}</td>
                    <td className="border p-2">{detalle.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 border border-negro rounded-[25px] text-white px-10 py-2"
                onClick={handleCloseDetalle}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarVentas;

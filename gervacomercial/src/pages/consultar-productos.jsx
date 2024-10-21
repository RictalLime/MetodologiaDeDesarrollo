import React, { useState, useEffect } from "react";
import EditarProductos from "@/componentes/EditarProductos";
import { supabaseClient } from "@/utils/supabase";

function ConsultarProductos() {
  const [productos, setProductos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    let { data: productos, error } = await supabaseClient.from("producto")
      .select(`
        id,
        nombre,
        precio,
        color,
        talla,
        modelo (
          id,
          nombre,
          marca (
            id,
            nombre
          )
        )
      `);
    if (error) {
      console.error(error);
    } else {
      console.log(productos);
      setProductos(productos);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Lista de productos</h1>
        <div className="border border-negro rounded-[20px] flex">
          <img src="/assets/search.svg" alt="" />
          <input
            type="text"
            placeholder="Busca un empleado"
            className="rounded-tr-[20px] rounded-br-[20px] p-2"
          />
        </div>
      </div>
      <table className="w-full md:w-[80vw] mt-5">
        <thead>
          <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
            <th className="rounded-tl-[25px]">Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Talla</th>
            <th className="rounded-tr-[25px]">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos?.map((producto) => (
            <tr key={producto.id} className="hover:bg-azul">
              <td className="border border-negro">{producto.nombre}</td>
              <td className="border border-negro">
                {producto.modelo.marca.nombre}
              </td>
              <td className="border border-negro">{producto.modelo.nombre}</td>
              <td className="border border-negro">{producto.color}</td>
              <td className="border border-negro">{producto.talla}</td>
              <td className="border border-negro">{producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="border border-negro rounded-[25px] bg-azul p-1 m-5 w-40"
          onClick={handleOpenEdit}
        >
          Editar
        </button>
        <button className="border border-negro rounded-[25px] bg-red-400 p-1 mt5 w-40">
          Eliminar
        </button>
      </div>
      {openEdit && <EditarProductos onClose={handleCloseEdit} />}
    </div>
  );
}

export default ConsultarProductos;

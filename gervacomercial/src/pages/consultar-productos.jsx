import React, { useState, useEffect } from "react";
import EditarProductos from "@/componentes/EditarProductos";
import { supabaseClient } from "@/utils/supabase";

function ConsultarProductos() {
  const [productos, setProductos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productoIdToDelete, setProductoIdToDelete] = useState(null);

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
        disponibles,
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
      setProductos(productos);
    }
  };

  const handleOpenEdit = (producto) => {
    setSelectedProducto(producto);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProducto(null);
  };

  const openDeleteConfirmation = (productoId) => {
    setProductoIdToDelete(productoId);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setProductoIdToDelete(null);
  };

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from("producto")
      .delete()
      .eq("id", productoIdToDelete);

    if (error) {
      console.error(error);
    } else {
      fetchProductos();
    }
    closeDeleteModal();
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex flex-col md:flex-row w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Lista de productos</h1>
        <div className="border border-negro rounded-[20px] flex">
          <img src="/assets/search.svg" alt="" />
          <input
            type="text"
            placeholder="Busca un producto"
            className="rounded-tr-[20px] rounded-br-[20px] p-2 w-[250px]"
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
            <th>Precio</th>
            <th>Disponibles</th>
            <th className="rounded-tr-[25px]">Acciones</th>
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
              <td className="border border-negro">{producto.disponibles}</td>
              <td className="border border-negro flex">
                <button
                  className="border border-negro rounded-[25px] bg-azul p-1 m-1"
                  onClick={() => handleOpenEdit(producto)}
                >
                  Editar
                </button>
                <button
                  className="border border-negro rounded-[25px] bg-red-400 p-1 m-1"
                  onClick={() => openDeleteConfirmation(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openEdit && (
        <EditarProductos
          onClose={handleCloseEdit}
          producto={selectedProducto}
          onUpdate={fetchProductos}
        />
      )}
      {openDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              ¿Seguro que quieres eliminarlo?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 border border-negro rounded-[25px] text-white px-4 py-2 mr-2"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 border border-negro rounded-[25px] text-white px-4 py-2"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarProductos;

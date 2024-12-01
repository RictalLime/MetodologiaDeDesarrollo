import React, { useState, useEffect } from "react";
import EditarProductos from "@/componentes/EditarProductos";
import { supabaseClient } from "@/utils/supabase";
import { roboto, playfair_Display } from "@/utils/fonts";

function ConsultarProductos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
      setFilteredProductos(productos); // Inicia el filtrado con todos los productos
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(value.toLowerCase()) ||
        producto.modelo.marca.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProductos(filtered);
  };

  const handleOpenEdit = (producto) => {
    setSelectedProducto(producto);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProducto(null);
  };

  const openDeleteConfirmation = (producto) => {
    setSelectedProducto(producto);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedProducto(null);
  };

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from("producto")
      .delete()
      .eq("id", selectedProducto.id);

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
        <h1 className={`${playfair_Display.className} text-4xl font-bold`}>
          Productos
        </h1>
        <div
          className={`${roboto.className} border border-negro rounded-[20px] flex`}
        >
          <img src="/assets/search.svg" alt="Buscar" />
          <input
            type="text"
            placeholder="Busca un producto"
            className={`${roboto.className} rounded-tr-[20px] rounded-br-[20px] p-2 w-[250px]`}
            value={searchText} // Vincula el texto de búsqueda
            onChange={handleSearch} // Evento de cambio para filtrar
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className={`${roboto.className} w-full md:w-[80vw] mt-5`}>
          <thead>
            <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
              <th className="rounded-tl-[25px]">Id</th>
              <th>Nombre</th>
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
            {filteredProductos.map((producto) => (
              <tr key={producto.id} className="hover:bg-azul">
                <td className="border border-negro p-2">{producto.id}</td>
                <td className="border border-negro p-2">{producto.nombre}</td>
                <td className="border border-negro p-2">
                  {producto.modelo.marca.nombre}
                </td>
                <td className="border border-negro p-2">
                  {producto.modelo.nombre}
                </td>
                <td className="border border-negro p-2">{producto.color}</td>
                <td className="border border-negro p-2">{producto.talla}</td>
                <td className="border border-negro p-2">{producto.precio}</td>
                <td className="border border-negro p-2">
                  {producto.disponibles}
                </td>
                <td className="border border-negro flex">
                  <button
                    className={`${roboto.className} border border-negro rounded-[25px] bg-azul p-1 m-1`}
                    onClick={() => handleOpenEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${roboto.className} border border-negro rounded-[25px] bg-red-400 p-1 m-1`}
                    onClick={() => openDeleteConfirmation(producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            <p className={`${roboto.className} text-lg font-semibold mb-4`}>
              ¿Seguro que quieres eliminar el producto "
              {selectedProducto?.nombre}"?
            </p>
            <div className="flex justify-end">
              <button
                className={`${roboto.className} bg-gray-400 border border-negro rounded-[25px] text-white px-4 py-2 mr-2`}
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                className={`${roboto.className} bg-red-500 border border-negro rounded-[25px] text-white px-4 py-2`}
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

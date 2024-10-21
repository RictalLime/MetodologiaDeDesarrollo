import EditarProductos from "@/componentes/EditarProductos";
import React, { useState, useEffect } from "react";

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
    const fetchProductos = async () => {
      const data = [
        {
          id: 1,
          nombre: "Zapatos",
          marca: "Flexi",
          modelo: "Oxford",
          precio: 1200,
          color: "Negros",
          talla: "26",
        },
        {
          id: 2,
          nombre: "Tenis",
          marca: "Pirma",
          modelo: "Sport",
          precio: 1200,
          color: "Azules",
          talla: "26",
        },
      ];
      setProductos(data);
    };
    fetchProductos();
  }, []);
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
      <div className="w-full md:w-[80vw] flex bg-azul border border-negro rounded-[20px]">
        <h1 className="w-[4%] border-r flex flex-col items-center font-semibold text-lg p-2">
          Id
        </h1>
        <h1 className="w-[22%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Nombre
        </h1>
        <h1 className="w-[15%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Marca
        </h1>
        <h1 className="w-[18%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Modelo
        </h1>
        <h1 className="w-[14%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Precio
        </h1>
        <h1 className="w-[20%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Color
        </h1>
        <h1 className="w-[7%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Talla
        </h1>
      </div>
      <table className="w-full md:w-[80vw] mt-5">
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="hover:bg-azul">
              <td className="border border-negro">{producto.id}</td>
              <td className="border border-negro">{producto.nombre}</td>
              <td className="border border-negro">{producto.marca}</td>
              <td className="border border-negro">{producto.modelo}</td>
              <td className="border border-negro">{producto.precio}</td>
              <td className="border border-negro">{producto.color}</td>
              <td className="border border-negro">{producto.talla}</td>
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

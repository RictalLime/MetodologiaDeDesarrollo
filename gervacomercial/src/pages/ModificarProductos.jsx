import React from "react";

function ModificarProductos() {
  return (
    <div className="w-screen relative flex flex-col items-center p-20 bg-blanco text-negro">
      <img
        src="/flecha.svg"
        alt=""
        className="absolute top-10 left-10 w-10 h-10"
      />
      <h1 className="text-[64px]">Editar Producto</h1>
      <form action="" id="formulario de productos" className="flex">
        <div className="p-2">
          <div className="flex flex-col w-[484px]">
            <label form="user" className="text-[20px]">
              Nombre
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
              id="user"
              name="user"
            />
          </div>
          <div className="flex flex-col w-[484px]">
            <label form="money" className="text-[20px]">
              Precio
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
            />
          </div>
          <div className="flex flex-col w-[484px]">
            <label form="model" className="text-[20px]">
              Modelo
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
            />
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col w-[484px]">
            <label form="talla" className="text-[20px]">
              Talla
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
            />
          </div>
          <div className="flex flex-col w-[484px]">
            <label form="marca" className="text-[20px]">
              Marca
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
            />
          </div>
          <div className="flex flex-col w-[484px]">
            <label form="color" className="text-[20px]">
              Color
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              type="text"
            />
          </div>
        </div>
      </form>
      <div className="mt-10">
        <input
          className="border border-negro bg-green-300 rounded-[25px] px-5 py-2"
          type="button"
          value="Aceptar"
        />
        <input
          className="border border-negro bg-green-300 rounded-[25px] px-5 py-2"
          type="button"
          value="Cancelar"
        />
      </div>
    </div>
  );
}

export default ModificarProductos;

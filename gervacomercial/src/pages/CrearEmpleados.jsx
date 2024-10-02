import React from "react";

function CrearEmpleados() {
  return (
    <div className="w-screen relative h-screen flex flex-col items-center bg-white text-black p-20">
      <img
        src="/flecha.svg"
        alt=""
        className="absolute top-10 left-10 w-10 h-10"
      />
      <h1 className="text-4xl">Crear empleados</h1>
      <form className="flex flex-col w-[360px]" action="">
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nombre del usuario"
            className=" border rounded-[25px] border-black"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Sueldo por día
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Sueldo por día"
            className="border rounded-[25px] border-black"
          />
        </div>
        <button className="border rounded-md bg-blue-400 p-1 mt-5">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CrearEmpleados;

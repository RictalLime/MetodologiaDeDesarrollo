import React from "react";

function CrearEmpleados() {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white text-black">
      <h1 className="text-[4rem]">Crear empleados</h1>

      <form className="flex flex-col w-[360px]" action="">
        <div className="flex flex-col mt-5">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nombre del usuario"
            className=" border rounded-lg border-black"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="username">Sueldo por día</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Sueldo por día"
            className="border rounded-lg border-black"
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

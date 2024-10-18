import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/Schemas/Employee";

function RegistrarEmpleados() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Employee),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white text-black p-20">
      <h1 className="text-4xl">Crear empleados</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[360px]"
      >
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del usuario"
            className=" border rounded-[25px] border-black"
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Sueldo por día
          </label>
          <input
            type="number"
            name="sueldo"
            placeholder="Sueldo por día"
            className="border rounded-[25px] border-black"
            {...register("sueldo", { valueAsNumber: true })}
          />
          {errors.sueldo && (
            <span className="text-red-500">{errors.sueldo.message}</span>
          )}
        </div>
        <button
          className="border rounded-md bg-blue-400 p-1 mt-5"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default RegistrarEmpleados;

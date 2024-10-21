import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/Schemas/Employee";

function EditarEmpleados({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Employee),
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white text-black p-20">
      <img
        src="/flecha.svg"
        alt=""
        className="absolute top-10 left-10 w-10 h-10"
      />
      <h1 className="text-4xl">Editar empleados</h1>
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
        <div className="flex">
          <button
            className="border rounded-md bg-blue-400 p-1 mt-5 w-40"
            type="submit"
          >
            Aceptar
          </button>
          <button
            className="border rounded-md bg-blue-400 p-1 mt-5 w-40"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarEmpleados;

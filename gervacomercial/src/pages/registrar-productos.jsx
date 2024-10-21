import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterProduct } from "@/Schemas/RegisterProduct";

function RegistrarProductos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterProduct),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen flex flex-col items-center p-20 bg-blanco text-negro">
      <h1 className="text-[64px]">Registrar Producto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="p-2">
          <div className="flex flex-col w-[484px]">
            <label form="user" className="text-[20px]">
              Nombre
            </label>
            <input
              className="border border-negro rounded-[25px] h-8"
              name="nombre"
              {...register("nombre")}
            />
            {errors.nombre && (
              <span className="text-red-500">{errors.nombre.message}</span>
            )}
          </div>
          <div className="flex flex-col w-[484px]">
            <label className="text-[20px]">Precio</label>
            <input
              type="number"
              name="precio"
              className="border border-negro rounded-[25px] h-8"
              {...register("precio", { valueAsNumber: true })}
            />
            {errors.precio && (
              <span className="text-red-500">{errors.precio.message}</span>
            )}
          </div>
          <div className="flex flex-col w-[484px]">
            <label className="text-[20px]">Modelo</label>
            <input
              className="border border-negro rounded-[25px] h-8"
              {...register("modelo")}
              name="modelo"
            />
            {errors.modelo && (
              <span className="text-red-500">{errors.modelo.message}</span>
            )}
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col w-[484px]">
            <label className="text-[20px]">Talla</label>
            <input
              className="border border-negro rounded-[25px] h-8"
              {...register("talla")}
              name="talla"
            />
            {errors.talla && (
              <span className="text-red-500">{errors.talla.message}</span>
            )}
          </div>
          <div className="flex flex-col w-[484px]">
            <label className="text-[20px]">Marca</label>
            <input
              className="border border-negro rounded-[25px] h-8"
              {...register("marca")}
              name="marca"
            />
            {errors.marca && (
              <span className="text-red-500">{errors.marca.message}</span>
            )}
          </div>
          <div className="flex flex-col w-[484px]">
            <label className="text-[20px]">Color</label>
            <input
              className="border border-negro rounded-[25px] h-8"
              {...register("color")}
              name="color"
            />
            {errors.color && (
              <span className="text-red-500">{errors.color.message}</span>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            className="border border-negro bg-green-300 rounded-[25px] px-5 py-2"
            type="submit"
          >
            Aceptar
          </button>
          <button className="border border-negro bg-green-300 rounded-[25px] px-5 py-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrarProductos;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProduct } from "@/Schemas/EditProduct";

function EditarProductos({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditProduct),
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-negro bg-opacity-50">
      <div className="flex flex-col items-center rounded-[20px] w-[356px] md:w-[484px] overflow-y-auto p-20 bg-blanco text-negro">
        <h1 className="text-[64px]">Editar Producto</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-2">
            <div className="flex flex-col w-full">
              <label form="user" className="text-[20px]">
                Nombre
              </label>
              <input
                className="border border-negro rounded-[25px] h-8"
                type="text"
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
                className="border border-negro rounded-[25px] h-8"
                type="number"
                name="precio"
                {...register("precio", { valueAsNumber: true })}
              />
              {errors.precio && (
                <span className="text-red-500">{errors.precio.message}</span>
              )}
            </div>
            <div className="flex flex-col w-[484px]">
              <label form="model" className="text-[20px]">
                Modelo
              </label>
              <input
                className="border border-negro rounded-[25px] h-8"
                type="text"
                name="modelo"
                {...register("modelo")}
              />
              {errors.modelo && (
                <span className="text-red-500">{errors.modelo.message}</span>
              )}
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
                name="talla"
                {...register("talla")}
              />
              {errors.talla && (
                <span className="text-red-500">{errors.talla.message}</span>
              )}
            </div>
            <div className="flex flex-col w-[484px]">
              <label form="marca" className="text-[20px]">
                Marca
              </label>
              <input
                className="border border-negro rounded-[25px] h-8"
                type="text"
                name="marca"
                {...register("marca")}
              />
              {errors.marca && (
                <span className="text-red-500">{errors.marca.message}</span>
              )}
            </div>
            <div className="flex flex-col w-[484px]">
              <label form="color" className="text-[20px]">
                Color
              </label>
              <input
                className="border border-negro rounded-[25px] h-8"
                type="text"
                name="color"
                {...register("color")}
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
            <button
              onClick={onClose}
              className="border border-negro bg-green-300 rounded-[25px] px-5 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarProductos;

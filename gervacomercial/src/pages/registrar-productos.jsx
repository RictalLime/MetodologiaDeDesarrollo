import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterProduct } from "@/Schemas/RegisterProduct";
import { supabaseClient } from "@/utils/supabase";

function RegistrarProductos() {
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");

  useEffect(() => {
    getModelos();
    getMarcas();
  }, []);

  useEffect(() => {
    if (selectedMarca) {
      getModelosByMarca(selectedMarca);
    }
  }, [selectedMarca]);

  const getModelos = async () => {
    let { data: modelo, error } = await supabaseClient
      .from("modelo")
      .select("*");
    console.log(modelo);
    if (error) {
      console.log(error);
    } else {
      setModelos(modelo);
    }
  };

  const getMarcas = async () => {
    let { data: marca, error } = await supabaseClient.from("marca").select("*");
    console.log(marca);
    if (error) {
      console.log(error);
    } else {
      setMarcas(marca);
    }
  };

  const getModelosByMarca = async (marcaId) => {
    let { data: modelo, error } = await supabaseClient
      .from("modelo")
      .select("id, nombre")
      .eq("marcaid", marcaId);
    console.log(modelo);
    if (error) {
      console.log(error);
    } else {
      setModelos(modelo);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterProduct),
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    const { data, error } = await supabaseClient
      .from("producto")
      .insert([
        {
          nombre: formData.nombre,
          precio: formData.precio,
          talla: formData.talla,
          disponibles: formData.disponibles,
          color: formData.color,
          modeloid: formData.modelo,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      alert("Producto registrado");
      reset();
    }
  };

  return (
    <div className="w-screen flex flex-col items-center p-20 bg-blanco text-negro">
      <h1 className="text-[64px]">Registrar Producto</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col w-[484px]">
          <label form="user" className="text-[20px]">
            Nombre
          </label>
          <input
            className="border border-negro rounded-[25px] py-2 px-4"
            name="nombre"
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Talla</label>
          <input
            type="number"
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("talla", { valueAsNumber: true })}
            name="talla"
          />
          {errors.talla && (
            <span className="text-red-500">{errors.talla.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Precio</label>
          <input
            type="number"
            name="precio"
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("precio", { valueAsNumber: true })}
          />
          {errors.precio && (
            <span className="text-red-500">{errors.precio.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Disponibles</label>
          <input
            type="number"
            name="disponibles"
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("disponibles", { valueAsNumber: true })}
          />
          {errors.disponibles && (
            <span className="text-red-500">{errors.disponibles.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Marca</label>
          <select
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("marca")}
            onChange={(e) => setSelectedMarca(e.target.value)}
          >
            <option value="">Elige una marca</option>
            {marcas?.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
          {errors.marca && (
            <span className="text-red-500">{errors.marca.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Modelo</label>
          <select
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("modelo")}
          >
            <option value="">Elige un modelo</option>
            {modelos?.map((modelo) => (
              <option key={modelo.id} value={modelo.id}>
                {modelo.nombre}
              </option>
            ))}
          </select>
          {errors.modelo && (
            <span className="text-red-500">{errors.modelo.message}</span>
          )}
        </div>
        <div className="flex flex-col w-[484px]">
          <label className="text-[20px]">Color</label>
          <input
            className="border border-negro rounded-[25px] py-2 px-4"
            {...register("color")}
            name="color"
          />
          {errors.color && (
            <span className="text-red-500">{errors.color.message}</span>
          )}
        </div>
        <div className="mt-10">
          <button
            className="border border-negro bg-green-300 rounded-[25px] px-5 py-2 mr-5"
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

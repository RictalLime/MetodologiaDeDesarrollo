import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterProduct, TALLAS } from "@/Schemas/RegisterProduct";
import { supabaseClient } from "@/utils/supabase";
import { roboto } from "@/utils/fonts";

function EditarProductos({ onClose, producto, onUpdate }) {
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(producto.modelo.marca.id);

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
    if (error) {
      console.log(error);
    } else {
      setModelos(modelo);
    }
  };

  const getMarcas = async () => {
    let { data: marca, error } = await supabaseClient.from("marca").select("*");
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
    if (error) {
      console.log(error);
    } else {
      setModelos(modelo);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterProduct),
  });

  useEffect(() => {
    if (producto) {
      setValue("nombre", producto.nombre);
      setValue("talla", producto.talla);
      setValue("precio", parseFloat(producto.precio.replace(/[^0-9.-]+/g, "")));
      setValue("disponibles", producto.disponibles);
      setValue("marca", producto.modelo.marca.id);
      setValue("modelo", producto.modelo.id);
      setValue("color", producto.color);
    }
  }, [producto, setValue]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const { data, error } = await supabaseClient
      .from("producto")
      .update({
        nombre: formData.nombre,
        talla: formData.talla,
        precio: formData.precio,
        disponibles: formData.disponibles,
        modeloid: formData.modelo,
        color: formData.color,
      })
      .eq("id", producto.id)
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      onClose();
      onUpdate();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center rounded-[20px] w-[90%] md:w-[484px] bg-white text-negro p-5 max-h-[80vh] overflow-y-auto">
        <h1 className="text-4xl">Editar {producto.nombre}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center px-4 w-full"
        >
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
            <label className="text-[20px]">Talla</label>
            <select
              className={`${roboto.className} border border-negro rounded-[25px] py-2 px-4`}
              {...register("talla")}
            >
              <option value="">Elige una talla</option>
              {Object.entries(TALLAS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            {errors.talla && (
              <span className="text-red-500">{errors.talla.message}</span>
            )}
          </div>
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
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
          <div className="flex flex-col w-full">
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
          <div className="flex mt-5">
            <button
              className="border border-negro bg-green-300 rounded-[25px] px-10 py-2 mr-5"
              type="submit"
            >
              Aceptar
            </button>
            <button
              onClick={onClose}
              className="border border-negro bg-green-300 rounded-[25px] px-10 py-2"
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

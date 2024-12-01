import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/Schemas/Employee";
import { supabaseClient } from "@/utils/supabase";

function EditarEmpleados({ onClose, empleado, onUpdate }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let { data: rol, error } = await supabaseClient.from("rol").select("*");
    if (error) {
      console.log(error);
    } else {
      setRoles(rol);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Employee),
  });

  useEffect(() => {
    if (empleado && empleado.sueldobase) {
      setValue("nombre", empleado.nombre);
      setValue("apellidop", empleado.apellidop);
      setValue("apellidom", empleado.apellidom);
      setValue("correo", empleado.correo);
      setValue("contrasenia", empleado.contrasenia);
      setValue("rfc", empleado.rfc);
      const sueldoBase =
        parseFloat(empleado.sueldobase.replace(/[^0-9.]/g, "")) || 0;
      setValue("sueldobase", sueldoBase);
      setValue("rol", empleado.rolid);
      setValue("calle", empleado.calle);
      setValue("numero", empleado.numero);
      setValue("cp", empleado.cp);
      setValue("ciudad", empleado.ciudad);
    }
  }, [empleado, setValue]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const { data, error } = await supabaseClient
      .from("usuario")
      .update({
        nombre: formData.nombre,
        apellidop: formData.apellidop,
        apellidom: formData.apellidom,
        correo: formData.correo,
        contrasenia: formData.contrasenia,
        rfc: formData.rfc,
        sueldobase: formData.sueldobase,
        rolid: formData.rol,
        calle: formData.calle,
        numero: formData.numero,
        cp: formData.cp,
        ciudad: formData.ciudad,
      })
      .eq("id", empleado.id)
      .select();
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      onClose();
      onUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center rounded-[20px] w-[90%] md:w-[60vw] bg-white text-negro p-5 max-h-[80vh] overflow-y-auto">
        <h1 className="text-4xl">Editar a {empleado.nombre}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="w-full flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col w-full">
                <label className="font-bold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del usuario"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <span className="text-red-500">{errors.nombre.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Apellido paterno
                </label>
                <input
                  type="text"
                  name="apellidop"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("apellidop")}
                />
                {errors.apellidop && (
                  <span className="text-red-500">
                    {errors.apellidop.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Apellido materno
                </label>
                <input
                  type="text"
                  name="apellidom"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("apellidom")}
                />
                {errors.apellidom && (
                  <span className="text-red-500">
                    {errors.apellidom.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Correo
                </label>
                <input
                  type="text"
                  name="correo"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("correo")}
                />
                {errors.correo && (
                  <span className="text-red-500">{errors.correo.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="contrasenia"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("contrasenia")}
                />
                {errors.contrasenia && (
                  <span className="text-red-500">
                    {errors.contrasenia.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  RFC
                </label>
                <input
                  type="text"
                  name="rfc"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("rfc")}
                />
                {errors.rfc && (
                  <span className="text-red-500">{errors.rfc.message}</span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Sueldo por semana
                </label>
                <input
                  type="number"
                  name="sueldobase"
                  placeholder="Sueldo por semana"
                  className="border rounded-[25px] border-black py-2 px-4"
                  {...register("sueldobase", { valueAsNumber: true })}
                />
                {errors.sueldobase && (
                  <span className="text-red-500">
                    {errors.sueldobase.message}
                  </span>
                )}
              </div>
              {roles.length > 0 && (
                <div className="flex flex-col w-full">
                  <label htmlFor="username" className="font-bold">
                    Puesto
                  </label>
                  <select
                    className="border rounded-[25px] border-black py-2 px-4"
                    name="rol"
                    {...register("rol")}
                  >
                    <option value="">Elige un rol</option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.rol && (
                    <span className="text-red-500">{errors.rol.message}</span>
                  )}
                </div>
              )}
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Calle
                </label>
                <input
                  type="text"
                  name="calle"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("calle")}
                />
                {errors.calle && (
                  <span className="text-red-500">{errors.calle.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Numero de casa
                </label>
                <input
                  type="number"
                  name="numero"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("numero", { valueAsNumber: true })}
                />
                {errors.numero && (
                  <span className="text-red-500">{errors.numero.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Código postal
                </label>
                <input
                  type="text"
                  name="cp"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("cp")}
                />
                {errors.cp && (
                  <span className="text-red-500">{errors.cp.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="font-bold">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="ciudad"
                  className=" border rounded-[25px] border-black py-2 px-4"
                  {...register("ciudad")}
                />
                {errors.ciudad && (
                  <span className="text-red-500">{errors.ciudad.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 w-full flex justify-center">
            <button
              className="border border-negro rounded-[25px] bg-green-300 px-10 py-2 mr-5"
              type="submit"
            >
              Aceptar
            </button>
            <button
              className="border border-negro rounded-[25px] bg-green-300 px-10 py-2"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarEmpleados;

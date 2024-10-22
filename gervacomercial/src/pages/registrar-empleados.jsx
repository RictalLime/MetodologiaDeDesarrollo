import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/Schemas/Employee";
import { supabaseClient } from "@/utils/supabase";

function RegistrarEmpleados() {
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Employee),
  });

  const onSubmit = async (formData) => {
    console.log(formData);

    let { error } = await supabaseClient.auth.signUp({
      email: formData.correo,
      password: formData.contrasenia,
    });
    if (error) {
      console.log(error);
    } else {
      let { data, error } = await supabaseClient
        .from("usuario")
        .insert([
          {
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
          },
        ])
        .select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        alert("Usuario creado correctamente");
        reset();
      }
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white text-black p-20">
      <h1 className="text-4xl">Registrar empleados</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[484px]"
      >
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="nombre"
            className=" border rounded-[25px] border-black py-2 px-4"
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
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
            <span className="text-red-500">{errors.apellidop.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
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
            <span className="text-red-500">{errors.apellidom.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
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
            <span className="text-red-500">{errors.contrasenia.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Sueldo por día
          </label>
          <input
            type="number"
            name="sueldobase"
            placeholder="Sueldo por día"
            className="border rounded-[25px] border-black py-2 px-4"
            {...register("sueldobase", { valueAsNumber: true })}
          />
          {errors.sueldobase && (
            <span className="text-red-500">{errors.sueldobase.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="username" className="font-bold">
            Puesto
          </label>
          <select
            className="border rounded-[25px] border-black py-2 px-4"
            name="rol"
            {...register("rol")}
          >
            <option value="">Elige un rol</option>
            {roles?.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
          {errors.rol && (
            <span className="text-red-500">{errors.rol.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
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
        <div className="flex flex-col mt-5">
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

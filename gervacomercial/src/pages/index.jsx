import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, roles } from "@/Schemas/LoginSchema";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// const { data, error } = await supabase
//   .from('talla')
//   .insert({nombre: "grande"})
//   .select()

{
  /*const { data, error } = await supabase
  .from("producto")
  .insert({
    modelo: "prueba",
    marca: "prueba",
    precio: 180.0,
    color: "blanco",
    tallaid: 5,
    disponibles: 200,
  })
  .select();
  */
}

// const { data, error } = await supabase
//   .from('producto')
//   .delete()
//   .eq("id", 1)

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen flex flex-col items-center bg-blanco p-5 md:p-10">
      <h1 className="text-4xl text-center text-negro mb-10">Gerva Comercial</h1>
      {/*<MenuCerrarSesion />
       */}
      <h1 className="text-3xl">Iniciar sesión</h1>
      <form
        className=" flex flex-col w-[360px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">Rol</label>
          <select
            className="border-2 border-negro rounded-[25px] pl-2"
            name="RolOpciones"
            id="RolSelect"
            {...register("option")}
          >
            <option value="">Selecciona un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.option && (
            <span className="text-red-500">{errors.option.message}</span>
          )}
        </div>
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">
            Correo Eléctronico o nombre de usuario
          </label>
          <input
            className="border-2 border-negro rounded-[25px] pl-2"
            type="text"
            name="email"
            id="emailInput"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">Contraseña</label>
          <input
            className="border-2 border-negro rounded-[25px] pl-2"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          className="text-lg border p-1 mt-5 rounded-[25px] border-negro bg-blue-400"
          type="submit"
        >
          Iniciar sesión
        </button>
        <div className="w-full flex justify-center">
          <Link
            href={"/contrasena"}
            className="text-lg underline underline-offset-1"
          >
            Olvidé mi contraseña
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Home;

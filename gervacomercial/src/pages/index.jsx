import React from "react";
import Link from "next/link";
import MenuCerrarSesion from "@/componentes/MenuCerrarSesion";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// const { data, error } = await supabase
//   .from('talla')
//   .insert({nombre: "grande"})
//   .select()

const { data, error } = await supabase
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

// const { data, error } = await supabase
//   .from('producto')
//   .delete()
//   .eq("id", 1)

function Home() {
  const handleSubmit = (e) => {};
  return (
    <div className="w-screen flex flex-col items-center bg-blanco p-5 md:p-10">
      <h1 className="text-4xl text-center text-negro mb-10">Gerva Comercial</h1>
      {/*<MenuCerrarSesion />
       */}
      <h1 className="text-3xl">Iniciar sesión</h1>
      <form className=" flex flex-col w-[360px]" onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">Rol</label>
          <select
            className="border-2 border-negro rounded-[25px]"
            name="RolOpciones"
            id="RolSelect"
          >
            <optgroup className="text-base">
              <option value="">Selecciona un rol</option>
              <option className="text-base" value="">
                Administrador
              </option>
              <option className="text-base" value="">
                Empleado
              </option>
            </optgroup>
          </select>
        </div>
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">
            Correo Eléctronico o nombre de usuario
          </label>
          <input
            className="border-2 border-negro rounded-[25px]"
            type="text"
            name="email"
            id="emailInput"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label className="text-lg font-bold">Contraseña</label>
          <input
            className="border-2 border-negro rounded-[25px]"
            type="password"
          />
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

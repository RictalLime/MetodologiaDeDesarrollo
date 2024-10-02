import MenuCerrarSesion from "@/componentes/MenuCerrarSesion";
import React from "react";

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
  return (
    
    <div className="h-screen w-screen flex flex-col items-center bg-blanco p-5 md:p-20">
      <h1 className="text-4xl text-center text-negro">
        Gerva Comercial Proximamente
      </h1>
      <MenuCerrarSesion/>
      <div className="w-full md:w-1/2 mt-5 p-5">
        <div className="w-full mt-5">
          <h1 className="text-negro mb-2">Usuario</h1>
          <input
            type="text"
            placeholder="Usuario"
            className="border border-negro rounded-md w-full"
          />
        </div>
        <div className="w-full mt-5">
          <h1 className="text-negro mb-2">Contraseña</h1>
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-negro rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient("", "")

// const { data, error } = await supabase
//   .from('talla')
//   .insert({nombre: "grande"})
//   .select()

const { data, error } = await supabase
  .from('producto')
  .insert({modelo: "prueba", marca: "prueba", precio: 180.0, color: "blanco", tallaid: 5, disponibles: 200})
  .select()

// const { data, error } = await supabase
//   .from('producto')
//   .delete()
//   .eq("id", 1)

function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blanco">
      <h1 className="text-7xl text-center text-negro">
        Gerva Comercial Proximamente
      </h1>
      <p>Base de datos</p>
      <div>supa</div>
    </div>
  );
}

export default Home;

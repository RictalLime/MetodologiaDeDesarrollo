import MenuCerrarSesion from "@/componentes/MenuCerrarSesion";
import React from "react";

function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-blanco p-5 md:p-20">
      <h1 className="text-4xl text-center text-negro">
        Gerva Comercial Proximamente
      </h1>
      <MenuCerrarSesion/>
    </div>
  );
}

export default Home;

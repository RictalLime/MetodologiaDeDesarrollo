import React from "react";

function Home() {
  return (
    
    <div className="h-screen w-screen flex flex-col items-center bg-blanco p-5 md:p-20">
      <h1 className="text-4xl text-center text-negro">
        Gerva Comercial Proximamente
      </h1>
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

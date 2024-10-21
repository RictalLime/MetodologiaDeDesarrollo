import React from "react";
import Link from "next/link";

function Login() {
  const handleSubmit = (e) => {};

  return (
    <div className="w-screen flex flex-col items-center text-negro">
      <h1 className="text-5xl">Iniciar sesión</h1>
      <form className=" flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="text-lg">
          Rol
          <select
            className="border-2 border-negro rounded-[25px]"
            name="RolOpciones"
            id="RolSelect"
          >
            <optgroup className="text-base" label="Selecciona un rol">
              <option className="text-base" value="">
                Administrador
              </option>
              <option className="text-base" value="">
                Empleado
              </option>
            </optgroup>
          </select>
        </label>
        <label className="text-lg font-bold">
          Correo Eléctronico o nombre de usuario
        </label>
        <input
          className="border-2 border-negro rounded-[25px]"
          type="text"
          name="email"
          id="emailInput"
        />
        <label className="text-lg font-bold">Contraseña</label>
        <input
          className="border-2 border-negro rounded-[25px]"
          type="password"
        />
        <button
          className="text-lg border-2 rounded-[25px] border-negro"
          type="submit"
        >
          Iniciar sesión
        </button>
        <Link
          href={"/contrasena"}
          className="text-lg hover:underline-offset-1 hover:border-negro"
        >
          Olvidé mi contraseña
        </Link>
      </form>
    </div>
  );
}

export default Login;

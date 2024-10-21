import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, roles } from "@/Schemas/LoginSchema";
import { supabaseClient } from "@/utils/supabase";

function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    console.log(data);
    if (error) {
      console.log(error);
    } else {
      router.push("/consultar-empleados");
    }
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
          <label className="text-lg font-bold">
            Correo Eléctronico o nombre de usuario
          </label>
          <input
            className="border-2 border-negro rounded-[25px] py-2 px-4"
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
            className="border-2 border-negro rounded-[25px] py-2 px-4"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          className="text-lg border p-1 mt-5 rounded-[25px] border-negro bg-azul"
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

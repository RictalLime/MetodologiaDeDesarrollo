import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, roles } from "@/Schemas/LoginSchema";
import { supabaseClient } from "@/utils/supabase";
import LoginNavbar from "../componentes/layout/Navbarnologin";


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
    const { data: signInData, error: signInError } =
      await supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (signInError) {
      console.log(signInError);
    } else {
      const access_token = signInData.session.access_token;
      const refresh_token = signInData.session.refresh_token;

      const { data: session, error: sessionError } =
        await supabaseClient.auth.setSession({
          access_token,
          refresh_token,
        });

      if (session.user.email === "admin@gerva.com") {
        router.push("/consultar-empleados");
      }

      const { data: userData, error: userError } = await supabaseClient
        .from("usuario")
        .select("*")
        .eq("correo", data.email)
        .single();

      localStorage.setItem("userid", userData.id);
      localStorage.setItem("userrol", userData.rolid);
      
      if (userError) {
        console.log(sessionError);
        console.log(
          "El usuario no existe en las bases de datos (public y auth)"
        );
      } else {
        if (userData.rolid === 1) {
          router.push("/consultar-empleados");
        } else if (userData.rolid === 2) {
          router.push("/registrar-venta");
        } else {
          console.log("Rol no reconocido");
        }
      }
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
      </form>
    </div>
  );
}

export default Home;

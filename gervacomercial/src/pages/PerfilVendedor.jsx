import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@/utils/supabase";

export default function PerfilVendedor() {
  const router = useRouter();
  const { nombre, rfc, correo, calle, numero, cp, ciudad } = router.query;
  const [asistencias, setAsistencias] = useState([]);

  // Función para cargar las asistencias
  const cargarAsistencias = async () => {
    console.log("Cargando asistencias...");
    try {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

      if (userError) {
        console.error("Error al obtener usuario:", userError.message);
        return;
      }

      if (!user) {
        console.error("Usuario no autenticado.");
        return;
      }

      // Obtener las asistencias del usuario
      const { data: asistenciaData, error } = await supabaseClient
        .from("asistencia")
        .select("*")
        .eq("usuarioid", user.id);

      if (error) {
        console.error("Error al obtener asistencias:", error.message);
        return;
      }

      console.log("Asistencias recuperadas:", asistenciaData);
      setAsistencias(asistenciaData);
    } catch (e) {
      console.error("Error inesperado al cargar asistencias:", e.message);
    }
  };

  // Función para registrar asistencia
  const handleTerminarTurno = async () => {
    console.log("Iniciando registro de asistencia...");
    try {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

      if (userError) {
        console.error("Error al obtener usuario:", userError.message);
        return;
      }

      if (!user) {
        console.error("Usuario no autenticado.");
        return;
      }

      console.log("Usuario autenticado:", user);

      // Insertar asistencia en la tabla
      const fechaActual = new Date().toISOString();

      const { error: insertError } = await supabaseClient
        .from("asistencia")
        .insert({ usuarioid: user.id, fecha: fechaActual });

      if (insertError) {
        console.error("Error al registrar la asistencia:", insertError.message);
        return;
      }

      console.log("Asistencia registrada exitosamente.");
      cargarAsistencias(); // Recargar asistencias después de registrar
    } catch (error) {
      console.error("Error inesperado al registrar asistencia:", error.message);
    }
  };

  // Cargar las asistencias al montar el componente
  useEffect(() => {
    cargarAsistencias();
  }, []);

  const diasSemanaIniciales = ["L", "M", "X", "J", "V", "S", "D"]; // Iniciales de los días de la semana

  // Crear una tabla para mostrar asistencias por día de la semana
  const asistenciasPorDia = diasSemanaIniciales.map((dia, index) => {
    const asistenciaDia = asistencias.find(asistencia => {
      const fecha = new Date(asistencia.fecha);
      return fecha.getDay() === (index + 1) % 7; // Ajustar índice (Lunes = 1, Domingo = 0)
    });
    return (
      <td key={index} className="border px-4 py-2">
        {asistenciaDia ? new Date(asistenciaDia.fecha).toLocaleTimeString() : "Sin registro"}
      </td>
    );
  });

  return (
    <div className="w-screen min-h-screen flex flex-col items-start bg-blanco text-black p-5 md:p-20">
      <div className="flex justify-between items-center w-full mb-10">
        <div className="flex items-center">
          <img
            src="/acount.svg"
            className="w-20 cursor-pointer mr-4"
            alt="Usuario"
          />
          <div className="flex flex-col">
            <h1 className="text-[32px] font-bold">{nombre}</h1>
            <label className="text-gray-600">Empleado</label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleTerminarTurno}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm"
          >
            Terminar turno
          </button>
          <img
            src="/logout.svg"
            className="w-6 h-6 text-red-500 cursor-pointer"
            alt="Salir"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      <div className="mt-10 p-8 rounded-lg bg-azul text-black w-full max-w-md border-2 border-negro">
        <h2 className="text-3xl font-bold mb-4">Datos personales</h2>
        <p className="text-lg">
          <span className="font-semibold">Nombre:</span> {nombre}
        </p>
        <p className="text-lg">
          <span className="font-semibold">RFC:</span> {rfc}
        </p>
        <p className="text-lg">
          <span className="font-semibold">C. Electrónico:</span> {correo}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Dirección:</span> {calle} {numero},{" "}
          {cp}, {ciudad}
        </p>
      </div>
      <div className="flex mt-10 gap-12">
        <div className="p-8 rounded-lg bg-azul text-black w-full max-w-xl border-2 border-negro">
          <h2 className="text-2xl font-bold mb-4">Asistencias</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr className="bg-azul text-black">
                  {diasSemanaIniciales.map((dia, index) => (
                    <th key={index} className="border px-4 py-2">{dia}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>{asistenciasPorDia}</tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-8 rounded-lg bg-azul text-black w-full max-w-md border-2 border-negro">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Comisiones</h2>
            <span className="text-red-500 text-2xl">$</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Primera quincena de noviembre</p>
            <span className="text-4xl font-bold">$999</span>
          </div>
        </div>
      </div>
    </div>
  );
}

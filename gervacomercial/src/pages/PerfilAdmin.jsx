import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { roboto, playfair_Display } from "@/utils/fonts";
import { supabaseClient } from "@/utils/supabase";

export default function PerfilAdmin() {
  const router = useRouter();
  const {
    nombre,
    apellidop,
    apellidom,
    rfc,
    correo,
    calle,
    numero,
    cp,
    ciudad,
    id,
  } = router.query;

  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = async () => {
    const { data: asistencias, error } = await supabaseClient
      .from("asistencia")
      .select("*")
      .eq("usuarioid", id);

    if (error) {
      console.error(error);
    } else {
      setAsistencias(asistencias);
    }
  };

  const getDayOfWeek = (date) => {
    const days = ["D", "L", "M", "X", "J", "V", "S"];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  const renderAsistencias = () => {
    const days = ["L", "M", "X", "J", "V", "S", "D"];
    const asistenciaMap = {};

    asistencias.forEach((asistencia) => {
      const day = getDayOfWeek(asistencia.fecha);
      asistenciaMap[day] = new Date(asistencia.fecha).toLocaleDateString();
    });

    return days.map((day, index) => (
      <div key={index} className="p-3 border-2 rounded-lg bg-blanco text-black">
        {asistenciaMap[day] || " "}
      </div>
    ));
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blanco text-black p-5 md:p-20">
      <div className="flex justify-between items-center w-full mb-10">
        <div className="flex items-center">
          <img
            src="/acount.svg"
            className="w-20 cursor-pointer mr-4"
            alt="Usuario"
          />
          <div className="flex flex-col">
            <h1
              className={`${playfair_Display.className} text-[32px] font-bold`}
            >{`${nombre} ${apellidop} ${apellidom}`}</h1>
            <label className={`${roboto.className} text-gray-600`}>Admin</label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={"/"}
            className={`${roboto.className} bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm`}
          >
            Terminar turno
          </Link>
          <img
            src="/logout.svg"
            className="w-6 h-6 text-red-500 cursor-pointer"
            alt="Salir"
          />
        </div>
      </div>

      <div className="flex">
        <div className="m-10 p-8 rounded-lg bg-azul text-black w-[40vw] border-2 border-negro">
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
        <div className="p-8 rounded-lg bg-azul text-black w-[40vw] border-2 border-negro m-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`${playfair_Display.className} text-2xl font-bold`}>
              Comisiones
            </h2>
            <span className="text-red-500 text-2xl">$</span>
          </div>
          <div className="flex justify-between items-center">
            <p className={`${roboto.className} text-lg`}>
              Primera quincena de noviembre
            </p>
            <span className={`${playfair_Display.className} text-xl font-bold`}>
              $999
            </span>
          </div>
        </div>
      </div>
      <div className="flex m-10 gap-12 w-[60vw]">
        <div className="p-8 rounded-lg bg-azul text-black w-full border-2 border-negro">
          <h2 className="text-2xl font-bold mb-4">Asistencias</h2>
          <div className="grid grid-cols-7 gap-2 text-base">
            {renderAsistencias()}
          </div>
        </div>
      </div>
      <div className="flex m-10 gap-12 w-[60vw]">
        <div className="p-8 rounded-lg bg-azul text-black w-full border-2 border-negro">
          <h2 className="text-2xl font-bold mb-4">Asistencias</h2>
          <div className="grid grid-cols-7 gap-2 text-base">
            {renderAsistencias()}
          </div>
        </div>
      </div>
    </div>
  );
}

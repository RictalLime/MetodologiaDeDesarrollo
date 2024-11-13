import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@/utils/supabase";

export default function PerfilVendedor() {
  const router = useRouter();
  const { nombre, rfc, correo, calle, numero, cp, ciudad, id } = router.query;
  const [asistencias, setAsistencias] = useState([]);
  const [userId, setUserId] = useState(null);
  const [comision, setComision] = useState(0);

  useEffect(() => {
    fetchAsistencias();
    const id = localStorage.getItem("userid");
    setUserId(id);

    getComisionActual();
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

  const handleTerminarTurno = async () => {
    // Lógica para terminar el turno
    router.push("/");
  };

  const getComisionActual = async () => {
    let { data, error } = await supabaseClient
      .rpc("obtener_comision_usuario", { _usuario_id: userId })
      .single();
    console.log(data.comision);

    if (error) {
      console.log(error);
      setComision(0);
    }
    if (data) {
      console.log(data.comision);

      let texto = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(data.comision);

      setComision(texto);
    } else {
      setComision(0);
    }
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
            <h2 className="text-2xl font-bold">Comisiones</h2>
            <span className="text-red-500 text-2xl">{comision}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Primera quincena de noviembre</p>
            <span className="text-4xl font-bold"></span>
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

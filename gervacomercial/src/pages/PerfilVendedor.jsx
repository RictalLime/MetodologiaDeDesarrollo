import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabaseClient } from "@/utils/supabase";
import { playfair_Display } from "@/utils/fonts";

export default function PerfilVendedor() {
  const [asistencias, setAsistencias] = useState([]);
  const [vendedorData, setVendedorData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [comision, setComision] = useState("$0.00");

  useEffect(() => {
    const id = localStorage.getItem("userid");
    setUserId(id);
  }, []);

  // Hasta que esté cargado el id, se ejecuta el resto.
  useEffect(() => {
    if (userId) {
      getVendedorData();
      fetchAsistencias();
      getComisionActual();
    }
  }, [userId]);

  const getVendedorData = async () => {
    const { data: vendedor, error } = await supabaseClient
      .from("usuario")
      .select(
        "id, nombre, apellidop, apellidom, rfc, correo, sueldobase, calle, numero, cp, ciudad"
      )
      .eq("id", userId)
      .single();

    if (error) {
      console.log(error);
    } else {
      setVendedorData(vendedor);
    }
  };

  const fetchAsistencias = async () => {
    let { data: asistencias, error } = await supabaseClient
      .from("asistencia")
      .select("*")
      .eq("usuarioid", userId);

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

  const getComisionActual = async () => {
    const timestamp = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Mexico_City",
    });

    const { data, error } = await supabaseClient
      .rpc("obtener_comision_usuario", {
        _usuario_id: userId,
        _fecha_actual: timestamp,
      })
      .limit(1); // Asegúrate de que la consulta devuelva solo una fila

    if (error) {
      console.log(error);
      setComision("$0.00");
    } else if (data && data.length > 0) {
      // Si la consulta devuelve datos, usamos el primero (en caso de que haya más de uno)
      const comision = data[0].comision;

      let texto = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(comision);

      setComision(texto);
    } else {
      setComision("$0.00");
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
            <h1
              className={`${playfair_Display.className} text-[32px] font-bold`}
            >{`${vendedorData.nombre} ${vendedorData.apellidop} ${vendedorData.apellidom}`}</h1>
            <label>Empleado</label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={"/"}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm"
          >
            Terminar turno
          </Link>
          <Link href={"/"}>
            <img
              src="/logout.svg"
              className="w-6 h-6 text-red-500 cursor-pointer"
              alt="Salir"
            />
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="m-10 p-8 rounded-lg bg-azul text-black w-[40vw] border-2 border-negro">
          <h2 className="text-3xl font-bold mb-4">Datos personales</h2>
          <p className="text-lg">
            <span className="font-semibold">Nombre:</span> {vendedorData.nombre}
          </p>
          <p className="text-lg">
            <span className="font-semibold">RFC:</span> {vendedorData.rfc}
          </p>
          <p className="text-lg">
            <span className="font-semibold">C. Electrónico:</span>{" "}
            {vendedorData.correo}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Dirección:</span>{" "}
            {vendedorData.calle} {vendedorData.numero}, {vendedorData.cp},{" "}
            {vendedorData.ciudad}
          </p>
        </div>
        <div className="p-8 rounded-lg bg-azul text-black w-[40vw] border-2 border-negro m-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Comisiones</h2>
            <span className="text-red-500 text-2xl">{comision}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Sueldo de la semana:</p>
            <span className="text-xl font-bold">{vendedorData.sueldobase}</span>
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
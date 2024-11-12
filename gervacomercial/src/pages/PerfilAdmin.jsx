import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  } = router.query;

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
            <h1 className="text-[32px] font-bold">{`${nombre} ${apellidop} ${apellidom}`}</h1>
            <label className="text-gray-600">Admin</label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={"/"}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm"
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

      <div className="mt-10 p-8 rounded-lg bg-azul text-black w-full max-w-md border-2 border-negro">
        <h2 className="text-3xl font-bold mb-4">Datos personales</h2>
        <p className="text-lg">
          <span className="font-semibold">Nombre:</span>{" "}
          {`${nombre} ${apellidop} ${apellidom}`}
        </p>
        <p className="text-lg">
          <span className="font-semibold">RFC:</span> {rfc}
        </p>
        <p className="text-lg">
          <span className="font-semibold">C. Electrónico:</span> {correo}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Dirección:</span>{" "}
          {`${calle} ${numero}, ${cp}, ${ciudad}`}
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

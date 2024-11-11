import React from 'react';

export default function PerfilVendedor() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-start bg-blanco text-black p-5 md:p-20">
      <div className="flex justify-between items-center w-full mb-10">
        <div className='flex items-center'>
          <img src='/acount.svg' className='w-20 cursor-pointer mr-4' alt="Usuario" />
          <div className='flex flex-col'>
            <h1 className="text-[32px] font-bold">Usuario</h1>
            <label className="text-gray-600">Empleado</label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
            Terminar turno
          </button>
          <img src="/logout.svg" className="w-6 h-6 text-red-500 cursor-pointer" alt="Salir" />
        </div>
      </div>

      <div className="mt-10 p-8 rounded-lg bg-azul text-black w-full max-w-md border-2 border-negro">
        <h2 className="text-3xl font-bold mb-4">Datos personales</h2>
        <p className="text-lg"><span className="font-semibold">Nombre:</span> José Ángel Espinosa Lagunes</p>
        <p className="text-lg"><span className="font-semibold">RFC:</span> EILA020730</p>
        <p className="text-lg"><span className="font-semibold">C. Electrónico:</span> joseangelepinoza5@gmail.com</p>
        <p className="text-lg"><span className="font-semibold">Dirección:</span> Av. De la república</p>
      </div>

      <div className="flex mt-10 gap-12">
        <div className="p-8 rounded-lg bg-azul text-black w-full max-w-md border-2 border-negro">
          <h2 className="text-2xl font-bold mb-4">Asistencias</h2>
          <div className="grid grid-cols-7 gap-2 text-center text-lg">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((dia, index) => (
              <div key={index} className="p-3 border-2 rounded-lg bg-blanco text-sky-600">
                {index === 0 ? '✔️' : ' '}
              </div>
            ))}
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


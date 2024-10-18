import EditarEmpleados from "@/componentes/EditarEmpleados";
import React, { useState, useEffect } from "react";

function ConsultarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    // Simulación de una llamada a una API para obtener los datos de los empleados
    const fetchEmpleados = async () => {
      const data = [
        {
          id: 1,
          nombre: "Juan Pérez",
          sueldoBase: 1000,
          comision: 10,
          total: 10000,
        },
        {
          id: 2,
          nombre: "María López",
          sueldoBase: 1200,
          comision: 15,
          total: 18000,
        },
        {
          id: 3,
          nombre: "Pedro Gómez",
          sueldoBase: 1500,
          comision: 20,
          total: 30000,
        },
        {
          id: 4,
          nombre: "Jose Martinez",
          sueldoBase: 2000,
          comision: 25,
          total: 50000,
        },
      ];
      setEmpleados(data);
    };

    fetchEmpleados();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Lista de empleados</h1>
        <div className="border border-negro rounded-[20px] flex">
          <img src="/assets/search.svg" alt="" />
          <input
            type="text"
            placeholder="Busca un empleado"
            className="rounded-tr-[20px] rounded-br-[20px] p-2"
          />
        </div>
      </div>
      <div className="w-full md:w-[80vw] flex bg-azul border border-negro rounded-[20px]">
        <h1 className="w-[5%] border-r flex flex-col items-center font-semibold text-lg p-2">
          Id
        </h1>
        <h1 className="w-[47%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Nombre
        </h1>
        <h1 className="w-[17%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Sueldo Base
        </h1>
        <h1 className="w-[10%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Comisión
        </h1>
        <h1 className="w-[21%] border-l border-negro flex flex-col items-center font-semibold text-lg p-2">
          Total
        </h1>
      </div>
      <table className="w-full md:w-[80vw] mt-5">
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="hover:bg-azul">
              <td className="border border-negro font-bold">{empleado.id}</td>
              <td className="border border-negro">{empleado.nombre}</td>
              <td className="border border-negro">{empleado.sueldoBase}</td>
              <td className="border border-negro">{empleado.comision}</td>
              <td className="border border-negro">{empleado.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="border border-negro rounded-[25px] bg-azul p-1 m-5 w-40"
          onClick={handleOpenEdit}
        >
          Editar
        </button>
        <button className="border border-negro rounded-[25px] bg-red-400 p-1 mt5 w-40">
          Eliminar
        </button>
      </div>
      {openEdit && <EditarEmpleados onClose={handleCloseEdit} />}
    </div>
  );
}

export default ConsultarEmpleados;

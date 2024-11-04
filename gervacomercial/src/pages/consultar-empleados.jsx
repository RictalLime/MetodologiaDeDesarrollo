import React, { useState, useEffect } from "react";
import EditarEmpleados from "@/componentes/EditarEmpleados";
import { supabaseClient } from "@/utils/supabase";

function ConsultarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null);

  useEffect(() => {
    fetchEmpleados();
    fetchRoles();
  }, []);

  const fetchEmpleados = async () => {
    let { data: empleados, error } = await supabaseClient
      .from("usuario")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setEmpleados(empleados);
    }
  };

  const fetchRoles = async () => {
    let { data: roles, error } = await supabaseClient.from("rol").select("*");
    if (error) {
      console.error(error);
    } else {
      setRoles(roles);
    }
  };

  const getRolNombre = (rolId) => {
    const rol = roles.find((r) => r.id === rolId);
    return rol ? rol.nombre : "Desconocido";
  };

  const handleOpenEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedEmpleado(null);
  };

  const confirmDelete = (empleadoId) => {
    setEmpleadoToDelete(empleadoId);
    setShowConfirmDelete(true);
  };

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from("usuario")
      .delete()
      .eq("id", empleadoToDelete);

    if (error) {
      console.error(error);
    } else {
      fetchEmpleados();
    }
    setShowConfirmDelete(false);
    setEmpleadoToDelete(null);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex w-[80vw] justify-between mb-5">
        <h1 className="text-4xl font-bold">Lista de empleados</h1>
        <div className="border border-negro rounded-[20px] flex">
          <img src="/assets/search.svg" alt="Buscar" />
          <input
            type="text"
            placeholder="Busca un empleado"
            className="rounded-tr-[20px] rounded-br-[20px] p-2"
          />
        </div>
      </div>
      <table className="w-full md:w-[80vw] mt-5 rounded-tl-[25px]">
        <thead>
          <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
            <th className="rounded-tl-[25px]">Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Sueldo base</th>
            <th className="rounded-tr-[25px]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="hover:bg-azul">
              <td className="border border-negro">{empleado.nombre}</td>
              <td className="border border-negro">{empleado.correo}</td>
              <td className="border border-negro">
                {getRolNombre(empleado.rolid)}
              </td>
              <td className="border border-negro">{empleado.sueldobase}</td>
              <td className="border border-negro">
                <button
                  className="border border-negro rounded-[25px] bg-azul p-1 m-1"
                  onClick={() => handleOpenEdit(empleado)}
                >
                  Editar
                </button>
                <button
                  className="border border-negro rounded-[25px] bg-red-400 p-1 m-1"
                  onClick={() => confirmDelete(empleado.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openEdit && (
        <EditarEmpleados
          onClose={handleCloseEdit}
          empleado={selectedEmpleado}
          onUpdate={fetchEmpleados}
        />
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              ¿Seguro que quieres eliminarlo?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarEmpleados;

import React, { useState, useEffect } from "react";
import EditarEmpleados from "@/componentes/EditarEmpleados";
import { supabaseClient } from "@/utils/supabase";
import { roboto, playfair_Display } from "@/utils/fonts";

function ConsultarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

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

  const confirmDelete = (empleado) => {
    setEmpleadoToDelete(empleado);
    setShowConfirmDelete(true);
  };

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from("usuario")
      .delete()
      .eq("id", empleadoToDelete.id);

    if (error) {
      console.error(error);
    } else {
      fetchEmpleados();
    }
    setShowConfirmDelete(false);
    setEmpleadoToDelete(null);
  };

  // Filtrado de empleados basado en el texto ingresado en la búsqueda
  const filteredEmpleados = empleados.filter((empleado) =>
    `${empleado.nombre} ${empleado.apellidop} ${empleado.correo}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <div className="flex flex-col md:flex-row w-[80vw] justify-between mb-5">
        <h1 className={`${playfair_Display.className} text-4xl font-bold`}>Empleados</h1>
        <div className={`${roboto.className} border border-negro rounded-[20px] flex`}>
          <img src="/assets/search.svg" alt="Buscar" className="w-10" />
          <input
            type="text"
            placeholder="Busca un empleado"
            className={`${roboto.className} rounded-tr-[20px] rounded-br-[20px] p-2 w-[250px]`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className={`${roboto.className} w-full md:w-[80vw] mt-5 rounded-tl-[25px]`}>
          <thead>
            <tr className="bg-azul rounded-tl-[25px] rounded-tr-[25px]">
              <th className="rounded-tl-[25px]">Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Sueldo base</th>
              <th className="rounded-tr-[25px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.map((empleado) => (
              <tr key={empleado.id} className="hover:bg-azul">
                <td className="border border-negro p-2">{empleado.nombre}</td>
                <td className="border border-negro p-2">
                  {empleado.apellidop}
                </td>
                <td className="border border-negro p-2">
                  {empleado.apellidom}
                </td>
                <td className="border border-negro p-2">{empleado.correo}</td>
                <td className="border border-negro p-2">
                  {getRolNombre(empleado.rolid)}
                </td>
                <td className="border border-negro p-2">
                  {empleado.sueldobase}
                </td>
                <td className="border border-negro">
                  <button
                    className={`${roboto.className} border border-negro rounded-[25px] bg-azul p-1 m-1`}
                    onClick={() => handleOpenEdit(empleado)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${roboto.className} border border-negro rounded-[25px] bg-red-400 p-1 m-1`}
                    onClick={() => confirmDelete(empleado)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            <p className={`${roboto.className} text-lg font-semibold mb-4`}>
              ¿Seguro que quieres eliminar a {empleadoToDelete?.nombre}?
            </p>
            <div className="flex justify-end">
              <button
                className={`${roboto.className} px-4 py-2 mr-2 bg-gray-300 rounded`}
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                className={`${roboto.className} px-4 py-2 bg-red-500 text-white rounded`}
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

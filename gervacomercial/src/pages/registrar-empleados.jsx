import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/Schemas/Employee";
import { supabaseClient } from "@/utils/supabase";
import { roboto, playfair_Display } from "@/utils/fonts";

function RegistrarEmpleados() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let { data: rol, error } = await supabaseClient.from("rol").select("*");
    console.log(rol);
    if (error) {
      console.log(error);
    } else {
      setRoles(rol);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Employee),
  });

  const onSubmit = async (formData) => {
    try {
      let { error: signUpError } = await supabaseClient.auth.signUp({
        email: formData.correo,
        password: formData.contrasenia,
      });

      if (signUpError) {
        // Si el correo ya existe, muestra el mensaje correspondiente
        if (signUpError.message.includes("already registered")) {
          setModalMessage(
            "El usuario ya está registrado. Por favor, intenta con otro."
          );
        } else {
          setModalMessage("Ocurrió un error al registrar el usuario.");
        }
        setShowModal(true);
        return;
      }

      let { error: insertError, data } = await supabaseClient
        .from("usuario")
        .insert([
          {
            nombre: formData.nombre,
            apellidop: formData.apellidop,
            apellidom: formData.apellidom,
            correo: formData.correo,
            contrasenia: formData.contrasenia,
            rfc: formData.rfc,
            sueldobase: formData.sueldobase,
            rolid: formData.rol,
            calle: formData.calle,
            numero: formData.numero,
            cp: formData.cp,
            ciudad: formData.ciudad,
          },
        ])
        .select();

      if (insertError) {
        console.log(insertError);
        setModalMessage(
          "Ocurrió un error al guardar la información del usuario."
        );
      } else {
        setModalMessage("Empleado registrado con éxito.");
        reset();
      }
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalMessage("Ocurrió un error inesperado.");
      setShowModal(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
      <h1 className={`${playfair_Display.className} text-[64px] font-bold`}>
        Registrar empleados
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full md:w-[484px]"
      >
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            name="nombre"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Apellido paterno
          </label>
          <input
            type="text"
            name="apellidop"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("apellidop")}
          />
          {errors.apellidop && (
            <span className="text-red-500">{errors.apellidop.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Apellido materno
          </label>
          <input
            type="text"
            name="apellidom"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("apellidom")}
          />
          {errors.apellidom && (
            <span className="text-red-500">{errors.apellidom.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Correo
          </label>
          <input
            type="text"
            name="correo"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("correo")}
          />
          {errors.correo && (
            <span className="text-red-500">{errors.correo.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Contraseña
          </label>
          <input
            type="password"
            name="contrasenia"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("contrasenia")}
          />
          {errors.contrasenia && (
            <span className="text-red-500">{errors.contrasenia.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            RFC
          </label>
          <input
            type="text"
            name="rfc"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("rfc")}
          />
          {errors.rfc && (
            <span className="text-red-500">{errors.rfc.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Sueldo por semana
          </label>
          <input
            type="number"
            name="sueldobase"
            placeholder="Sueldo por semana"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("sueldobase", { valueAsNumber: true })}
          />
          {errors.sueldobase && (
            <span className="text-red-500">{errors.sueldobase.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Puesto
          </label>
          <select
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            name="rol"
            {...register("rol")}
          >
            <option value="">Elige un rol</option>
            {roles?.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
          {errors.rol && (
            <span className="text-red-500">{errors.rol.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Calle
          </label>
          <input
            type="text"
            name="calle"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("calle")}
          />
          {errors.calle && (
            <span className="text-red-500">{errors.calle.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Numero de casa
          </label>
          <input
            type="number"
            name="numero"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("numero", { valueAsNumber: true })}
          />
          {errors.numero && (
            <span className="text-red-500">{errors.numero.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Código postal
          </label>
          <input
            type="text"
            name="cp"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("cp")}
          />
          {errors.cp && (
            <span className="text-red-500">{errors.cp.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 w-full">
          <label
            htmlFor="username"
            className={`${roboto.className} font-bold text-xl`}
          >
            Ciudad
          </label>
          <input
            type="text"
            name="ciudad"
            className={`${roboto.className} border rounded-[25px] border-black py-2 px-4`}
            {...register("ciudad")}
          />
          {errors.ciudad && (
            <span className="text-red-500">{errors.ciudad.message}</span>
          )}
        </div>
        <button
          className={`${playfair_Display.className} font-bold border border-negro bg-green-300 rounded-[25px] px-10 py-2 mt-10`}
          type="submit"
        >
          Aceptar
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{modalMessage}</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrarEmpleados;

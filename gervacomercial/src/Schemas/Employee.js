import { z } from "zod";

export const Employee = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  apellidop: z.string().nonempty("Escribe el apellido paterno"),
  apellidom: z.string().nonempty("Escribe el apellido materno"),
  correo: z.string().email("Escribe un correo válido"),
  contrasenia: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  rfc: z.string().nonempty("Escribe el RFC"),
  sueldobase: z.number("Escribe el sueldo base"),
  rol: z.string().nonempty("Elige un rol"),
});

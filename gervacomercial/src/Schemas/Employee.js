import { z } from "zod";

export const Employee = z.object({
  nombre: z
    .string()
    .nonempty("Escribe el nombre")
    .regex(/^[a-zA-Z]+$/, "Solo se permiten letras en el nombre"),
  apellidop: z
    .string()
    .nonempty("Escribe el apellido paterno")
    .regex(/^[a-zA-Z]+$/, "Solo se permiten letras en el nombre"),
  apellidom: z
    .string()
    .nonempty("Escribe el apellido materno")
    .regex(/^[a-zA-Z]+$/, "Solo se permiten letras en el nombre"),
  correo: z.string().email("Escribe un correo válido"),
  contrasenia: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  rfc: z.string().nonempty("Escribe el RFC"),
  sueldobase: z.number("Escribe el sueldo base"),
  rol: z.string().nonempty("Elige un rol"),
  calle: z.string().nonempty("Escribe la calle"),
  numero: z.number().int().nonnegative("Escribe el número"),
  cp: z.string().nonempty("Escribe el código postal"),
  ciudad: z.string().nonempty("Escribe la ciudad"),
});

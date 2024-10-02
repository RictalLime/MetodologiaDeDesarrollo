import { z } from "zod";

export const roles = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Empleado" },
];

export const LoginSchema = z.object({
  option: z.string().nonempty("Elige una opción"),
  email: z
    .string()
    .email("No es un correo válido")
    .nonempty("Debes esrcibir un correo"),
  password: z
    .string()
    .min(8, "La contraseña debe ser de al menos 8 caracteres"),
});

import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("No es un correo válido")
    .nonempty("Debes escribir un correo"),
  password: z
    .string()
    .min(8, "La contraseña debe ser de al menos 8 caracteres"),
});

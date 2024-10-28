import { z } from "zod";

export const RegisterProduct = z.object({
  nombre: z
    .string()
    .nonempty("Escribe el nombre")
    .regex(/^[a-zA-Z]+$/, "Solo se permiten letras en el nombre"),
  precio: z.number().positive("Escribe el precio"),
  talla: z.number().positive("Escribe la talla"),
  modelo: z.string().nonempty("Elije el modelo"),
  disponibles: z.number().int().nonnegative("Escribe la cantidad"),
  color: z
    .string()
    .nonempty("Escribe el color")
    .regex(/^[a-zA-Z]+$/, "Solo se permiten letras en el color"),
});

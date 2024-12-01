import { z } from "zod";

export const TALLAS = {
  24: "24",
  25: "25",
  26: "26",
  27: "27",
  28: "28",
  29: "29",
  30: "30",
};

export const RegisterProduct = z.object({
  nombre: z
    .string()
    .nonempty("Escribe el nombre")
    .regex(/^[\p{L}\s]+$/u, "Solo se permiten letras en el nombre"),
  precio: z.number().positive("Escribe el precio"),
  talla: z
    .string()
    .refine(
      (val) => Object.keys(TALLAS).includes(val),
      "Elige una talla válida"
    ),
  modelo: z.string().nonempty("Elije el modelo"),
  disponibles: z.number().int().min(1, "La cantidad debe ser mayor a 0"),
  color: z
    .string()
    .nonempty("Escribe el color")
    .regex(/^[\p{L}\s]+$/u, "Solo se permiten letras en el nombre"),
});

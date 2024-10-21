import { z } from "zod";

export const EditProduct = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  precio: z.number().positive("Escribe el precio"),
  talla: z.number().positive("Escribe la talla"),
  modelo: z.string().nonempty("Escribe el modelo"),
  disponibles: z.number().int().nonnegative("Escribe la cantidad"),
  color: z.string().nonempty("Escribe el color"),
});

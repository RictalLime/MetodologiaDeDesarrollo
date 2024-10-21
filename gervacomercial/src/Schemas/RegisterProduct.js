import { z } from "zod";

export const RegisterProduct = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  precio: z.number("Escribe el precio"),
  talla: z.string().nonempty("Escribe la talla"),
  modelo: z.string().nonempty("Escribe el modelo"),
  disponibles: z.number("Escribe la cantidad"),
  color: z.string().nonempty("Escribe el color"),
});

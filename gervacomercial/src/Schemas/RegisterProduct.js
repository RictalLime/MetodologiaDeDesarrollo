import { z } from "zod";

export const RegisterProduct = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  precio: z.number("Escribe el precio"),
  marca: z.string().nonempty("Escribe la marca"),
  modelo: z.string().nonempty("Escribe el modelo"),
  talla: z.string().nonempty("Escribe la talla"),
  color: z.string().nonempty("Escribe el color"),
});

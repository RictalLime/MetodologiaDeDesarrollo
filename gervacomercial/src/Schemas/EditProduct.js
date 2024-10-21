import { z } from "zod";

export const EditProduct = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  precio: z.number("Escribe el precio"),
  modelo: z.string().nonempty("Escribe el modelo"),
  talla: z.string().nonempty("Escribe la talla"),
  marca: z.string().nonempty("Escribe la marca"),
  color: z.string().nonempty("Escribe el color"),
});

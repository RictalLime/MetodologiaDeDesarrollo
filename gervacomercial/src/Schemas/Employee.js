import { z } from "zod";

export const Employee = z.object({
  nombre: z.string().nonempty("Escribe el nombre"),
  sueldo: z.number("Escribe el sueldo"),
});

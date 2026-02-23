import { z } from "zod"

export const responsibleInformationSchema = z.object({
  cedula: z.preprocess((value) => Number(value), z.number().min(100000000, { message: "Indique una cédula válida" })),
  name: z.string().min(1, { message: "Indique el nombre" }),
  lastName1: z.string().min(1, { message: "Indique el primer apellido" }),
  lastName2: z.string().min(1, { message: "Indique el segundo apellido" }),
  sex: z.string().min(1, { message: "Indique el género" }),
  mobilePhone: z.preprocess((value) => Number(value), z.number().min(10000000, { message: "Indique un celular válido" })),
  homePhone: z
    .preprocess(
      (value) => (value === "" || value === null || value === undefined ? undefined : Number(value)),
      z.number().optional(),
    )
    .optional(),
  email: z.string().email({ message: "Indique un correo válido" }),
  occupation: z.string().min(1, { message: "Indique la ocupación" }),
  country: z.string().min(1, { message: "Indique el país" }),
})

export type ResponsibleInformationSchemaType = z.infer<typeof responsibleInformationSchema>

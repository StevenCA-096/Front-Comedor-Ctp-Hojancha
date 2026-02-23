import { z } from "zod"

export const sendPasswordRecoverEmailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Indique su correo electrónico" })
    .email({ message: "Indique un correo electrónico válido" }),
})

export type SendPasswordRecoverEmailFormData = z.infer<typeof sendPasswordRecoverEmailSchema>

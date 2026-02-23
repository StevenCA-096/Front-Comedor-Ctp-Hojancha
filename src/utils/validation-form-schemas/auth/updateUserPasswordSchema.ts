import { z } from "zod"

export const updateUserPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "La confirmación debe tener al menos 6 caracteres" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export type UpdateUserPasswordFormData = z.infer<typeof updateUserPasswordSchema>

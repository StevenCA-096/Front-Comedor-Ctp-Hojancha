import { z } from "zod"

// Esquema de validación con Zod
export const userLoginSchema = z.object({
    username: z.preprocess(
        (value) => {
            return Number(value)
        },
        z.number().min(100000000, { message: 'Indique un número de cédula válido' }),
    ),
    password: z.string().nonempty({ message: 'Indique su contraseña' }),
})
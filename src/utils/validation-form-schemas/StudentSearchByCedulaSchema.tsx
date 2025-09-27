import { z } from 'zod'

export const studentSearchByCedulaSchema = () => {
    const schema = z.object({
        cedula: z.preprocess((value) => {
            return Number(value);
        }, z.number().min(100000000, { message: "Indique un número de cédula válido entre 9 y 13 dígitos" }).max(9999999999999,{message:'Indique un número de cédula válido entre 9 y 13 dígitos'})),
    })
    return schema
}
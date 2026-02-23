import { z } from 'zod'

// Schema simplificado y funcional
export const studentInformationSchema = z.object({
    cedula: z.preprocess(
        (value) => Number(value as string),
        z.number().min(100000000, { message: "Indique un número de cédula válido" })
    ),
    name: z.string().min(1, { message: "Indique su nombre" }),
    lastName1: z.string().min(1, { message: "Indique su primer apellido" }),
    lastName2: z.string().min(1, { message: "Indique su segundo apellido" }),
    sex: z.string({message:"Indique su género"}).min(1, { message: "Indique su género" }),
    birthday: z.string().min(1, { message: "Indique su fecha de nacimiento" }),
    lastInstitution: z.string().min(1, { message: "Indique su institución previa" }),
    adequacy: z.string().min(1, { message: "Indique si requiere adecuación" }),
    personalEmail: z.string()
        .min(1, { message: "Indique su correo personal" })
        .regex(/@gmail\.com$/, { message: "El correo debe terminar en @gmail.com" }),
    mepEmail: z.string().optional(),
    isRecursing: z.preprocess((value) => Boolean(value), z.boolean()),

    // Campos condicionales - ahora con validación inline
    country: z.string(),
    province: z.string({message:"Indique su provincia"}).refine(() => {
        // Si es Costa Rica, debe tener provincia
        return true // La validación real está abajo en superRefine
    }),
    canton: z.string({message:"Indique su canton"}).refine(() => {
        return true
    }),
    district: z.string({message:"Indique su distrito"}).refine(() => {
        return true
    })
}).refine((data) => {
    // Si país es Costa Rica, debe tener provincia
    if (data.country === 'Costa Rica') {
        return data.province && data.province.trim().length > 0
    }
    return true
}, {
    message: "Indique su provincia de nacimiento",
    path: ["province"]
}).refine((data) => {
    // Si país es Costa Rica, debe tener cantón
    if (data.country === 'Costa Rica') {
        return data.canton && data.canton.trim().length > 0
    }
    return true
}, {
    message: "Indique su cantón de nacimiento",
    path: ["canton"]
}).refine((data) => {
    // Si país es Costa Rica, debe tener distrito
    if (data.country === 'Costa Rica') {
        return data.district && data.district.trim().length > 0
    }
    return true
}, {
    message: "Indique su distrito de nacimiento",
    path: ["district"]
})

export type StudentInfoSchemaType = z.infer<typeof studentInformationSchema>
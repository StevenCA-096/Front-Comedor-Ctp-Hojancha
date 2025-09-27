import z from "zod";

//Validation schema and data structure for http request
export const createDiningStudentSchema = z.object({
    amountPaid: z.preprocess((value) => {
        return Number(value);
    }, z.number()),
    paymentMethod: z.enum(['Efectivo', 'SINPE'], {
        error: () => ({ message: 'Indique el método de pago' })
    }),
})
import z from "zod";

export const homeAndTransportSchema = (requireTransport: boolean) => {
  return z.object({
    canton: z.string({ message: "Indique su cantón" }),
    district: z.string({ message: "Indique su distrito" }),
    address: z.string().nonempty({ message: "Indique su dirección" }),
    transportRouteId: requireTransport 
      ? z.number({ message: "Debe indicar la ruta de transporte" })
      : z.number().optional(),
    requireTransport: z.boolean().default(requireTransport)
  });
};

export type HomeAndTransportSchemaType = z.infer<ReturnType<typeof homeAndTransportSchema>>
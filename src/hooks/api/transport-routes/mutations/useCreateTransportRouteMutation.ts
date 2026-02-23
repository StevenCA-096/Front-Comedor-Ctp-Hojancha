import { createtransportRoute } from "@/services/transport-route-service"
import type { CreateTransportRouteDto } from "@/types/transport-routes/dto/create-transport-route.dto"
import type { TransportRoute } from "@/types/transport-routes/transport-route.entity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useCreateTransportRouteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation<TransportRoute, AxiosError, CreateTransportRouteDto>({
        mutationFn: createtransportRoute,
        mutationKey: ['create-transport-route'],
        onError: (err) => err.status == 409 ?
            toast.error("El nombre ya esta en uso")
            :
            toast.error("Error al crear la ruta de transporte"),
        onSuccess: () => {
            toast.success("Ruta de transporte creada exitosamente")
            queryClient.invalidateQueries({ queryKey: ['transport-routes'] })
        },
    })
}

export default useCreateTransportRouteMutation
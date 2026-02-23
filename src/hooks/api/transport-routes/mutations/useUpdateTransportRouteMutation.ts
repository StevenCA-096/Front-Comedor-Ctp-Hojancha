import { updateTransportRoute } from "@/services/transport-route-service"
import type { UpdateTransportRouteDto } from "@/types/transport-routes/dto/update-transport-route.dto"
import type { TransportRoute } from "@/types/transport-routes/transport-route.entity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useUpdateTransportRouteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<TransportRoute, AxiosError, { id: number; data: UpdateTransportRouteDto }>({
    mutationFn: ({ id, data }) => updateTransportRoute(id, data),
    mutationKey:['update-transport-route'],
    onError: () => toast.error("Error al actualizar la ruta de transporte"),
    onSuccess: () => {
      toast.success("Ruta de transporte actualizada exitosamente")
      queryClient.invalidateQueries({ queryKey: ['transport-routes'] })
    },
  })
}

export default useUpdateTransportRouteMutation
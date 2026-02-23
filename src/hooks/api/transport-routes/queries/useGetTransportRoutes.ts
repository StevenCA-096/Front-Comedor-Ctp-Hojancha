import { getTransportRoutes } from "@/services/transport-route-service"
import type { TransportRoute } from "@/types/transport-routes/transport-route.entity"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useGetTransportRoutes = () => {
  return useQuery<unknown, AxiosError, TransportRoute[]>({
    queryKey:['transport-routes'],
    queryFn: getTransportRoutes,
  })
}

export default useGetTransportRoutes
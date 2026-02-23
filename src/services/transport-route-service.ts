import { api } from "@/api/api"
import type { CreateTransportRouteDto } from "@/types/transport-routes/dto/create-transport-route.dto"
import type { UpdateTransportRouteDto } from "@/types/transport-routes/dto/update-transport-route.dto"
import type { TransportRoute } from "@/types/transport-routes/transport-route.entity"

export const createtransportRoute = async (createtransportRoute: CreateTransportRouteDto) => {
    const data = (await api.post('transport-route', createtransportRoute)).data
    return data
}

export const updateTransportRoute = async (id: TransportRoute['id'], updated: UpdateTransportRouteDto) => {
    const data = (await api.patch('transport-route/'+id, updated)).data
    return data
}

export const getTransportRouteById = async (id: TransportRoute['id']) => {
    const data = (await api.get(`transport-route/${id}`)).data
    return data
}

export const getTransportRoutes = async () => {
    const data = (await api.get(`transport-route`)).data
    return data
}

export const deleteTransportRoute = async (id: TransportRoute['id']) => {
    const data = (await api.delete(`transport-route/${id}`)).data
    return data
}

import { createResposible } from "@/services/responsible-service"
import type { CreateResponsibleDto } from "@/types/responsible/dto/create-responsible.dto"
import type { Responsible } from "@/types/responsible/Responsible"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useCreateResponsibleMutation = () => {
  return useMutation<Responsible, AxiosError, CreateResponsibleDto, Responsible>({
    mutationFn:createResposible,
    mutationKey:['create-responsible'],
    onError: () => {
      toast.error('No fue posible crear guardar la Información  del responsable.')
    },
    onSuccess: () => {
      toast.success('Información  del responsable guardada exitosamente.')
    },
  })
}

export default useCreateResponsibleMutation

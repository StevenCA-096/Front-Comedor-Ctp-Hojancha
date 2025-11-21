import { useMutation, type MutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { updateDining } from '@/services/dining/diningService'
import type { UpdateDiningDto } from '@/types/dining/dining/dtos/UpdateDiningDto'
import toast from 'react-hot-toast'
import type { Dining } from '@/types/dining/dining/entities/dining'

const useUpdateDiningMutation = (options?: MutationOptions<Dining, AxiosError, UpdateDiningDto>) => {
    const updateDiningMutation = useMutation<Dining, AxiosError, UpdateDiningDto>({
        mutationFn: (data) => updateDining(data.id, data),
        onSuccess: () => toast.success("Exito al actualizar."),
        onError: () => toast.error("Ocurrió un error al actualizar el registro."),
        ...options
    })

    return updateDiningMutation
}

export default useUpdateDiningMutation
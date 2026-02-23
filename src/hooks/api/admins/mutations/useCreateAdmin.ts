import { createAdmin } from '@/services/adminService'
import type { CreateAdminDto } from '@/types/common/admin/dto/createAdminDto'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useCreateAdmin = () => {
  return useMutation<unknown, AxiosError, CreateAdminDto>({
    mutationFn: createAdmin,
    mutationKey: ['create-admin'],
    onError: () => toast.success('Ocurrió un error al agregar el colaborador.'),
    onSuccess: () => toast.success('Colaborador creado exitosamente.')
  })
}

export default useCreateAdmin
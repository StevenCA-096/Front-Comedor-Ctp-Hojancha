import { updateAdmin } from '@/services/adminService'
import type { Admin } from '@/types/common/admin/admin'
import type { UpdateAdminDto } from '@/types/common/admin/dto/updateAdminDto'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useUpdateAdmin = (id: Admin['id']) => {
  return useMutation<unknown, AxiosError, UpdateAdminDto>({
    mutationFn: (data) => updateAdmin(data, id),
    mutationKey: ['update-admin'],
    onError: () => toast.error('Ocurrió un error al actualizar el colaborador.'),
    onSuccess: () => toast.success('Colaborador actualizado exitosamente.')
  })
}

export default useUpdateAdmin
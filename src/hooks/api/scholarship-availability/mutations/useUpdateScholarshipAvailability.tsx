import { updateScholarshipAvailability } from '@/services/scholarship-availability/scholarshipAvailabilityService'
import type { CreateScholarshipAvailabilityDto } from '@/types/scholarship/scholarshipAvailability/dto/create-scholarshipAvailabilityDto'
import type { ScholarshipAvailability } from '@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useUpdateScholarshipAvailability = (id: ScholarshipAvailability['id']) => {
  return useMutation<ScholarshipAvailability, AxiosError, CreateScholarshipAvailabilityDto>({
    mutationFn: (data) => updateScholarshipAvailability(id, data),
    mutationKey: ['update-scholarship-availability'],
    onSuccess:() => toast.success("Datos actualizados correctamente"),
    onError:() => toast.error("Error al actualizar"),
  })
}

export default useUpdateScholarshipAvailability
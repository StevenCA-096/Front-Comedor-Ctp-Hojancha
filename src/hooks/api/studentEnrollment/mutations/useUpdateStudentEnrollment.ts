import { updateStudentEnrollment } from '@/services/student_enrollment-service'
import type { UpdateStudentEnrollmentDto } from '@/types/student-enrollment/dto/update-student_enrollment.dto'
import type { StudentEnrollment } from '@/types/student-enrollment/student-enrollment.entity'
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useUpdateStudentEnrollment = (id: StudentEnrollment['id'], options? : UseMutationOptions<StudentEnrollment, AxiosError, UpdateStudentEnrollmentDto>) => {
  const queryClient = useQueryClient()
  return useMutation<StudentEnrollment, AxiosError, UpdateStudentEnrollmentDto>({
    mutationFn: (updated) => updateStudentEnrollment(id, updated),
    mutationKey: ['update-student-enrollment', id],
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['student-cedula'] })
      queryClient.invalidateQueries({ queryKey: ['student-enrollments'] })

      toast.success("Actualizado exitosamente")
    },
    onError: () => toast.error("Error al actualizar"),
    ...options,
  })
}

export default useUpdateStudentEnrollment
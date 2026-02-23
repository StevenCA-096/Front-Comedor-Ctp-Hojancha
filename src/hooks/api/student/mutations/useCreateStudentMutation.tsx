import { createStudent } from '@/services/student-service'
import type { CreateStudentDto } from '@/types/student/dto/create-student.dto'
import type { Student } from '@/types/student/Student'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useCreateStudentMutation = () => {
  return useMutation<Student, AxiosError, CreateStudentDto>({
    mutationFn: createStudent,
    mutationKey:['create-student'],
    onError: () => toast.error('No fue posible crear guardar la Información  del estudiante.'),
    onSuccess: () => toast.success('Información  del estudiante guardada exitosamente.'),
  })
}

export default useCreateStudentMutation
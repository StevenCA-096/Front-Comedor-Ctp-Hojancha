import { getStudentFiles } from '@/services/files-service'
import type { Student } from '@/types/student/Student'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const useGetStudentFiles = (dni: Student['cedula']) => {
  return useQuery<string[], AxiosError, string[]>({
    queryKey:['student-files', dni],
    queryFn: () => getStudentFiles(dni),
    enabled: !!dni || dni !=0,
  })
}

export default useGetStudentFiles
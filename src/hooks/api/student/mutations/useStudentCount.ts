import { api } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const getStudentCount = async() => {
    const data = (await api.get('student/count')).data
    return data
}

const useStudentCount = () => {
  return useQuery<unknown, AxiosError, number>({
    queryKey:['student-count'],
    queryFn: getStudentCount,
  })
}

export default useStudentCount
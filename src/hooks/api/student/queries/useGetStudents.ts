import { getStudentUsersComplete } from '@/services/userService'
import type { User } from '@/types/common/user/user'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const useGetStudents = () => {
  return useQuery<unknown, AxiosError, User[]>({
    queryKey:['student-users'],
    queryFn: getStudentUsersComplete
  })
}

export default useGetStudents

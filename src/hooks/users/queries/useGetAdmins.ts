import { getAdmins } from "@/services/userService"
import type { User } from "@/types/common/user/user"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useGetAdmins = () => {
  return useQuery<unknown, AxiosError, User[]>({
    queryKey:['admins'],
    queryFn: getAdmins,
  })
}

export default useGetAdmins
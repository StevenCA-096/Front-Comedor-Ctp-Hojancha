import type { UpdateUserDto } from "@/services/user/dto/update-user.dto"
import { updateUser } from "@/services/userService"
import type { User } from "@/types/common/user/user"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useUpdateUser = (id: User['id']) => {
  return useMutation<unknown, AxiosError, UpdateUserDto>({
    mutationFn: (data) => updateUser(id, data),
    mutationKey:['update-user'],
    onError: () => toast.error("Error al actualiazr el usuario"),
    onSuccess: () => toast.success("Usuario actualizado exitosamente"),
  })
}

export default useUpdateUser
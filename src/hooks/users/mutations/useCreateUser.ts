import type { CreateUserDto } from "@/services/user/dto/create-user.dto"
import { createUser } from "@/services/userService"
import type { User } from "@/types/common/user/user"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useCreateUser = () => {
  return useMutation<User, AxiosError, CreateUserDto>({
    mutationFn: createUser,
    mutationKey:['create-user'],
    onError: () => toast.error("Error al crear el usuario"),
    onSuccess: () => toast.success("Usuario creado exitosamente"),
  })
}

export default useCreateUser
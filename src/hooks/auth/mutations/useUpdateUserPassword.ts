import { updateUserPassword } from "@/services/auth/authService"
import type { UpdateUserPasswordDto } from "@/types/common/auth/updateUserPassword.dto"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useUpdateUserPassword = () => {
  return useMutation<unknown, AxiosError, UpdateUserPasswordDto>({
    mutationKey: ["update-user-password"],
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente")
    },
    onError: () => {
      toast.error("No se pudo actualizar la contraseña")
    },
  })
}

export default useUpdateUserPassword

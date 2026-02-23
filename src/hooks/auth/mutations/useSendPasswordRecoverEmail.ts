import { sendPasswordRecoverEmail } from "@/services/auth/authService"
import type { SendPasswordRecoverEmailDto } from "@/types/common/auth/sendPasswordRecoverEmail.dto"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useSendPasswordRecoverEmail = () => {
  return useMutation<unknown, AxiosError, SendPasswordRecoverEmailDto>({
    mutationKey: ["send-password-recover-email"],
    mutationFn: sendPasswordRecoverEmail,
    onSuccess: () => {
      toast.success("Correo de recuperación enviado")
    },
    onError: () => {
      toast.error("No se pudo enviar el correo de recuperación")
    },
  })
}

export default useSendPasswordRecoverEmail

import type { LoginDto } from "@/types/common/auth/loginDto"
import type { SendPasswordRecoverEmailDto } from "@/types/common/auth/sendPasswordRecoverEmail.dto"
import type { UpdateUserPasswordDto } from "@/types/common/auth/updateUserPassword.dto"
import type { User } from "@/types/common/user/user"
import { api } from "@api/api"

//=== LOGINS O THE API IF SUCCESS RETURNS THE USER
export const login = async (credentials: LoginDto) => {
  const result = (await api.post<{user:User}>('auth/login', credentials)).data
  return result
}

//=== LOGOUT FROM API ONLY RETURNS STATUS 200
export const logoutFromApi = async () => {
  const result = (await api.post('auth/logout')).data
  return result
}

//=== REFRESHES THE TOKEN
export const refreshToken = async () => {
  await api.post('auth/refresh')
}

//=== SENDS THE RECOVER PASSWORD EMAIL
export const sendPasswordRecoverEmail = async ({ email, frontendUrl }: SendPasswordRecoverEmailDto) => {
  const encodedEmail = encodeURIComponent(email)
  const encodedFrontendUrl = encodeURIComponent(frontendUrl)
  const result = (await api.post(`mail/send-password-recover-email/${encodedEmail}/${encodedFrontendUrl}`)).data
  return result
}

//=== UPDATES USER PASSWORD USING A TOKEN IN THE AUTH HEADER
export const updateUserPassword = async ({ password, token }: UpdateUserPasswordDto) => {
  const result = (
    await api.patch(
      'users/update-user-password',
      { newPassword: password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  ).data

  return result
}

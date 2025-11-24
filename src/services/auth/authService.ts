import type { LoginDto } from "@/types/common/auth/loginDto"
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
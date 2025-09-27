import type { LoginDto } from "@/types/common/auth/loginDto"
import type { User } from "@/types/common/user/User"
import { api } from "@api/api"

//=== LOGINS O THE API IF SUCCESS RETURNS THE USER
export const login = async (credentials: LoginDto) => {
  const result = (await api.post<User>('auth/login', credentials)).data
  return result
}

//=== LOGOUT FROM API ONLY RETURNS STATUS 200
export const logoutFromApi = async () => {
  const result = (await api.post('auth/signout')).data
  return result
}
import { useAuthStore } from '@stores/auth/authStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function useRequireAuth() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
    }
  }, [isAuthenticated, navigate])
  
  return isAuthenticated
}

// Get user from zustand store
export function useUser() {
  return useAuthStore(state => state.user)
}
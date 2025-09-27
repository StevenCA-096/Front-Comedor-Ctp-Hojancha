// components/ProtectedRoute.jsx
import { useRequireAuth } from '@hooks/auth/useAuth'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import type { ReactNode } from 'react'

function ProtectedRoute({ children }: {children: ReactNode}) {
  const isAuthenticated = useRequireAuth()
  
  if (!isAuthenticated) {
    return <LoadingScreen />// O un spinner
  }
  
  return children
}

export default ProtectedRoute
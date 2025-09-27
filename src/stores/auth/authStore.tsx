// stores/authStore.ts
import type { User } from '@/types/common/user/User'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loginToState: (user: User) => void
  logoutFromState: () => void
  updateUserState: (userData: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      loginToState: (user: User) => set({ 
        user, 
        isAuthenticated: true 
      }),

      logoutFromState: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),

      updateUserState: (userData: User) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (
        state
      ): Pick<AuthState, 'user' | 'isAuthenticated'> => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

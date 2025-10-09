// src/store/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  getEffectiveTheme: () => 'light' | 'dark';
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      
      setMode: (mode: ThemeMode) => set({ mode }),
      
      getEffectiveTheme: () => {
        const { mode } = get();
        console.log('re-rendered-sore')
        if (mode === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        }
        return mode;
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
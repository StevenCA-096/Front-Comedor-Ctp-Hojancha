import { api } from '@/api/api';
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const handleAuthError = async (error: AxiosError) => {
  // Si no es error 401, no hacer nada
  if (error?.response?.status != 401) {
    return;
  }

  // Si ya estamos refrescando, esperar a que termine
  if (isRefreshing && refreshPromise) {
    await refreshPromise;
    return;
  }

  // Iniciar refresh
  isRefreshing = true;
  refreshPromise = api.post('/auth/refresh')
    .then(() => {
      console.log('Token refreshed successfully');
    })
    .catch((err) => {
      console.error('Token refresh failed:', err);
      // Limpiar y redirigir al login
      window.location.href = '/auth/login';
      throw err;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  await refreshPromise;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Si es 401, intentar refrescar token primero
        console.log(error)
        if (isAxiosError(error) && error.status == 401) {
          handleAuthError(error)
          setTimeout(() => {
            return failureCount < 2; // Solo 2 retry después del refresh
          }, 2000);
        }
        // Para otros errores, retry normal
        console.log("normal")
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
      retryDelay: 2000,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: (failureCount, error) => {
        if (isAxiosError(error) && error.response?.status == 401) {
          handleAuthError(error)
          return failureCount < 1;
        }
        // Para otros errores en mutations, NO reintentar
        return false;
      },
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      if (isAxiosError(error)) {
        await handleAuthError(error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error) => {
      if (isAxiosError(error)) {
        await handleAuthError(error);
      }
    },
  }),
});
import { getDinings } from "@/services/dining/diningService";
import type { Dining } from "@/types/dining/dining/entities/dining";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

// HOOK TO RETRIEVE ALL THE DININGS FROM THE SERVER WITH USEQUERY
export function useDiningList(
    options?: Partial<UseQueryOptions<Dining[], AxiosError>>
) {
    return useQuery<Dining[], AxiosError>({
        queryKey: ['dinings'],
        queryFn: getDinings,
        staleTime: 5 * 60 * 1000,     // 5 min - suficiente para la mayoría
        refetchOnWindowFocus: false,   // Avoid unnecesary refetch
        // Configuraciones de retry
        retry: (failureCount, error) => {
            // No retry en errores 4xx
            if (error.response?.status && error.response.status == 401) {
                return false;
            }
            return failureCount < 3;
        },
        ...options
    });
}

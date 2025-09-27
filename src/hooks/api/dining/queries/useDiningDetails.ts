import { getStatsById } from "@/services/dining/diningService";
import type { DiningDetailsDto } from "@/types/dining/dining/dtos/DiningDetailsDto";
import { useQuery, type UseQueryOptions,  } from "@tanstack/react-query";
import type { AxiosError } from "axios";

// HOOK TO RETRIEVE DINING DETAILS FROM SERVER/API
export function useDiningDetails(
    id: number,
    options?: Partial<UseQueryOptions<DiningDetailsDto, AxiosError>>
) {
    return useQuery<DiningDetailsDto, AxiosError>({
        queryFn: () => getStatsById(id),
        queryKey: [`dining-${id}`],
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!id,
        ...options, // ✅ Spread de opciones adicionales
    })
}
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
        queryFn: () => getDinings(),
        // Configuraciones de retry
        ...options
    });
}

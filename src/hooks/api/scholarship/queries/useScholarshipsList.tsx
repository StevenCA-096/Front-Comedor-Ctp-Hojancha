import { getScholarships } from "@/services/scholarship/scholarshipService"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useScholarshipsList = (
    options?: Partial<UseQueryOptions<Scholarship[], AxiosError>>
) => {
  return useQuery<Scholarship[], AxiosError>({
    queryKey: ['scholarship-list'],
    queryFn: getScholarships,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options
  })
}

export default useScholarshipsList
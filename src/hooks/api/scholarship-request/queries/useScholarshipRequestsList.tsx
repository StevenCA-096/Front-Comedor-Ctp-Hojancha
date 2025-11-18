import { getScholarshipRequests } from "@/services/scholarshipRequest/scholarshipRequestService"
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useScholarshipRequestsList = (
    options?: Partial<UseQueryOptions<ScholarshipRequest[], AxiosError>>
) => {
  return useQuery<ScholarshipRequest[], AxiosError>({
    initialData:[],
    queryKey: ['scholarship-requests'],
    queryFn: getScholarshipRequests,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    ...options
  })
}

export default useScholarshipRequestsList
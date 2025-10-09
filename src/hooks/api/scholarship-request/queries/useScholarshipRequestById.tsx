import { getScholarshipRequestById } from "@/services/scholarshipRequest/scholarshipRequestService"
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useScholarshipRequestsByID = (
    id: ScholarshipRequest['id'],
    options?: Partial<UseQueryOptions<ScholarshipRequest, AxiosError>>
) => {
  return useQuery<ScholarshipRequest, AxiosError>({
    queryKey: ['scholarship-request-'+id],
    queryFn: () => getScholarshipRequestById(id),
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // No retry en errores 4xx
      if (error.response?.status && error.response.status == 401) {
        return false;
      }
      return failureCount < 3;
    },
    ...options
  })
}

export default useScholarshipRequestsByID
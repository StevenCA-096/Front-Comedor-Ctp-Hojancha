import { getActiveScholarshipStudentsByYear } from "@/services/scholarshipRequest/scholarshipRequestService"
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useActiveScholarshipStudentsByYear = (year: number) => {
  return useQuery<any, AxiosError, ScholarshipRequest[] | undefined>({
    queryFn: () =>  getActiveScholarshipStudentsByYear(year),
    queryKey: ['active-scholarship-students'+year],
    enabled: !!year
  })
}

export default useActiveScholarshipStudentsByYear
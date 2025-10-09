import { updateScholarshipRequest } from '@/services/scholarshipRequest/scholarshipRequestService'
import type { UpdateScholarshipRequestDto } from '@/types/scholarship/scholarship_request/dto/update-scholarship-request.dto'
import type { ScholarshipRequest } from '@/types/scholarship/scholarship_request/entities/ScholarshipRequest'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type UpdateScholarshipRequestParams = {
    id: number;
    data: UpdateScholarshipRequestDto;
}

const useUpdateScholarshipRequestMutation = (
    options?: Omit<
        UseMutationOptions<Promise<ScholarshipRequest | AxiosError>, AxiosError, UpdateScholarshipRequestParams, unknown>,
        'mutationFn'
    >
) => {
    return useMutation<Promise<ScholarshipRequest | AxiosError>, AxiosError, UpdateScholarshipRequestParams>({
        mutationFn: ({ id, data }: UpdateScholarshipRequestParams) =>
            updateScholarshipRequest(id, data),
        ...options
    })
}

export default useUpdateScholarshipRequestMutation
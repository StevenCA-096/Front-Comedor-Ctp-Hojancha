import { updateScholarshipRequest } from '@/services/scholarshipRequest/scholarshipRequestService'
import type { UpdateScholarshipRequestDto } from '@/types/scholarship/scholarship_request/dto/update-scholarship-request.dto'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type UpdateScholarshipRequestParams = {
    id: number;
    data: UpdateScholarshipRequestDto;
}

const useUpdateScholarshipRequestMutation = (
    options?: Omit<
        UseMutationOptions<any, AxiosError, UpdateScholarshipRequestParams, unknown>,
        'mutationFn'
    >
) => {
    return useMutation<any, AxiosError, UpdateScholarshipRequestParams>({
        mutationFn: ({ id, data }: UpdateScholarshipRequestParams) =>
            updateScholarshipRequest(id, data),
        ...options
    })
}

export default useUpdateScholarshipRequestMutation
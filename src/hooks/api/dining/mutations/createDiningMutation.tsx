import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDining } from '@/services/dining/diningService'

const useCreateDiningMutation = () => {
    const queryClient = useQueryClient()
    const createDiningMutation = useMutation({
        mutationFn: createDining,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['dinings'] })
            return data
        },
        onError: (err) => {
            return err
        }
    })

    return createDiningMutation
}

export default useCreateDiningMutation
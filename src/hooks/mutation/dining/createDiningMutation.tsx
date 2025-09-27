import { useMutation } from '@tanstack/react-query'
import { createDining } from '@services/dining/diningService'

const useCreateDiningMutation = () => {
    const createDiningMutation = useMutation({
        mutationFn: createDining,
        onSuccess: (data) => {return data},
        onError: (err) => {
            return err
        }
    })

    return createDiningMutation
}

export default useCreateDiningMutation
import { useMutation } from '@tanstack/react-query'
import { confirmStudentPaymentForToday } from '@services/dining-student/diningStudentService'
import toast from 'react-hot-toast'

const useCreateDiningStudentMutation = () => {
    const createDiningMutation = useMutation({
        mutationFn: confirmStudentPaymentForToday,
        onSuccess: (res) => {
            toast.success(res?.hasPay?'Ya pagó':'Pago registrado')
        },
        onError:() => {
            alert('error')
        }
    })

    return createDiningMutation
}

export default useCreateDiningStudentMutation
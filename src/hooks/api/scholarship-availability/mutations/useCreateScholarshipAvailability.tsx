import { createScholarshipAvailability } from "@/services/scholarship-availability/scholarshipAvailabilityService"
import type { CreateScholarshipAvailabilityDto } from "@/types/scholarship/scholarshipAvailability/dto/create-scholarshipAvailabilityDto"
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

const useCreateScholarshipAvailability = () => {
    return useMutation<ScholarshipAvailability, AxiosError, CreateScholarshipAvailabilityDto>({
        mutationFn: createScholarshipAvailability,
        mutationKey: ['create-scholarship-availability'],
        onSuccess: (created) =>
            toast.success(`${created?.quota || ''} Cupos para ${created?.year || ''} creados`),
        onError: (err) => err.status == 409 ?
            toast.error(`Ya se crearon cupos este ciclo de la beca elegida`)
            :
            toast.error("No fue posible guardar la información"),
    })
}

export default useCreateScholarshipAvailability
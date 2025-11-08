import { api } from "@/api/api"
import type { CreateScholarshipAvailabilityDto } from "@/types/scholarship/scholarshipAvailability/dto/create-scholarshipAvailabilityDto"
import type { UpdateScholarshipAvailabilityDto } from "@/types/scholarship/scholarshipAvailability/dto/update-scholarshipAvailability.dto"
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability"

export const getScholarshipAvailability = async() => {
    const data = (await api.get('scholarship-availability')).data
    return data
}

export const createScholarshipAvailability = async(newAvailability:CreateScholarshipAvailabilityDto) => {
    const data = (await api.post('scholarship-availability',newAvailability)).data
    return data
}

export const updateScholarshipAvailability = async(id: ScholarshipAvailability['id'],updated:UpdateScholarshipAvailabilityDto) => {
    const data = (await api.patch('scholarship-availability/'+id,updated)).data
    return data
}
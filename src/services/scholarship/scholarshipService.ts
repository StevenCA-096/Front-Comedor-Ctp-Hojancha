import { api } from "@/api/api"
import type { CreateScholarshipDto } from "@/types/scholarship/scholarship/dto/create-scholarship.dto"
import type { UpdateScholarshipDto } from "@/types/scholarship/scholarship/dto/update-scholarship.dto"

export const getScholarships = async() => {
    const data =  (await api.get('scholarship')).data
    return data
}

export const createScholarship = async(newScholarship: CreateScholarshipDto) => {
    const data =  (await api.post('scholarship', newScholarship)).data
    return data
}

export const updateScholarship = async(scholarshipId: number, updatedScholarship: UpdateScholarshipDto) => {
    console.log(updatedScholarship)
    const data =  (await api.patch('scholarship/'+scholarshipId, updatedScholarship)).data
    return data
}
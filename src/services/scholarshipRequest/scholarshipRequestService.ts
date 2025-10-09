import { api } from "@/api/api"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import type { UpdateScholarshipRequestDto } from "@/types/scholarship/scholarship_request/dto/update-scholarship-request.dto"

export const getScholarshipRequests = async() => {
    let data = (await api.get('scholarship-request')).data
    return data
}

export const getActiveScholarshipStudentsByYear = async(year:number) => {
    let data = (await api.get('scholarship-request/active-scholarship-per-year/year='+year)).data
    return data
}

export const getScholarshipRequestById = async(id: Scholarship['id']) => {
    let data = (await api.get('scholarship-request/details/'+id)).data
    return data
}

export const updateScholarshipRequest = async(id: Scholarship['id'], updated: UpdateScholarshipRequestDto) => {
    let data = (await api.patch('scholarship-request/'+id, updated)).data
    return data
}
import { api } from "@/api/api"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"

export const getScholarshipRequests = async() => {
    let data = (await api.get('scholarship-request')).data
    return data
}

export const getScholarshipRequestById = async(id: Scholarship['id']) => {
    let data = (await api.get('scholarship-request/details/'+id)).data
    return data
}
import { api } from "@/api/api"

export const getScholarships = async() => {
    const data =  (await api.get('scholarship')).data
    return data
}
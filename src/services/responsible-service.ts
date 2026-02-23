import type { Responsible } from '@/types/responsible/Responsible'
import { api } from '../api/api'
import type { UpdateResponsibleDto } from '@/types/responsible/dto/update-responsible.dto'
import type { CreateResponsibleDto } from '@/types/responsible/dto/create-responsible.dto'

export const createResposible = async (responsible: CreateResponsibleDto) => {
  let data = (await api.post('responsible', responsible)).data
  return data
}

export const updateResposible = async (id: Responsible['id'], updatedResponsible: UpdateResponsibleDto) => {
    let data = (await api.patch(`responsible/${id}`, updatedResponsible)).data
    return data
}

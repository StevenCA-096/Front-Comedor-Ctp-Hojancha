import { api } from "@/api/api";
import type { CreateNewsDto } from "@/types/news/dto/create-news.dto";
import type { UpdateNewsDto } from "@/types/news/dto/update-news.dto";
import type { News } from "@/types/news/news.entity";

//This is another entity, but since there is no CRUD for it, there will be in this service
export const getTags = async() => {
    const data = (await api.get('tags')).data;
    return data
}

export const getNews = async() => {
    const data = (await api.get('news')).data;
    return data
}

export const getNewById = async(id: News['id']) => {
    const data = (await api.post('news/'+id)).data;
    return data
}

export const createNew = async (newDto: CreateNewsDto) => {
    const data = (await api.post('news', newDto)).data;
    return data
}

export const updateNew = async(id: News['id'], updated: UpdateNewsDto) => {
    const data = (await api.patch('news/'+id, updated)).data;
    return data
}


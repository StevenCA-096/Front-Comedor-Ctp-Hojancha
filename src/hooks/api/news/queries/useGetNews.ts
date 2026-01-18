import { getNews } from '@/services/news.service'
import type { News } from '@/types/news/news.entity'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const useGetNews = () => {
  return useQuery<News[], AxiosError, News[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
}

export default useGetNews
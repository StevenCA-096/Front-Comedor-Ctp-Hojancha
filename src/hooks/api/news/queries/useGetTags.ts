import { getTags } from '@/services/news.service'
import type { Tag } from '@/types/news/tag.entity'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const useGetTags = () => {
  return useQuery<Tag[], AxiosError, Tag[]>({
    queryKey:['tags'],
    queryFn: getTags,
  })
}

export default useGetTags
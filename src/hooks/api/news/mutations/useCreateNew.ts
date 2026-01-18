import { createNew } from '@/services/news.service'
import type { CreateNewsDto } from '@/types/news/dto/create-news.dto'
import type { News } from '@/types/news/news.entity'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const useCreateNew = () => {
  const queryClient =  useQueryClient()
  return useMutation<News, AxiosError, CreateNewsDto>({
    mutationKey: ['create-new'],
    mutationFn: createNew,
    onSuccess: () => {
      toast.success("Noticia agregada exitosamente")
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
    onError: () => toast.error("Error al guardar la noticia"),
  })
}

export default useCreateNew
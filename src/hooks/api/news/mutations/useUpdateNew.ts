import { updateNew } from "@/services/news.service";
import type { UpdateNewsDto } from "@/types/news/dto/update-news.dto";
import type { News } from "@/types/news/news.entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const useUpdateNew = (id: News["id"]) => {
  const queryClient = useQueryClient();
  return useMutation<News, AxiosError, UpdateNewsDto>({
    mutationKey: ["news", id],
    mutationFn: (data) => updateNew(id, data),
    onSuccess: () => {
      toast.success("Noticia actualizada con éxito");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      toast.error(`Error al actualizar la noticia`);
    },
    
  });
};

export default useUpdateNew;

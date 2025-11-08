import { createScholarship } from "@/services/scholarship/scholarshipService"
import type { CreateScholarshipDto } from "@/types/scholarship/scholarship/dto/create-scholarship.dto"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useCreateScholarship = (options?: UseMutationOptions<Scholarship, AxiosError, CreateScholarshipDto>) => {
  return useMutation<Scholarship, AxiosError, CreateScholarshipDto>({
    mutationKey:["create-scholarship"],
    mutationFn: createScholarship,
    onError:() => toast.error("Error al crear la beca"),
    onSuccess: () => toast.success("Beca creada exitosamente."),
    ...options
  })
}

export default useCreateScholarship
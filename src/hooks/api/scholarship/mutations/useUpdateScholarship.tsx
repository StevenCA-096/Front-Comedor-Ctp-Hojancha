import { updateScholarship } from "@/services/scholarship/scholarshipService"
import type { UpdateScholarshipDto } from "@/types/scholarship/scholarship/dto/update-scholarship.dto"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

const useUpdateScholarship = (scholarshipId: number, options?: UseMutationOptions<Scholarship, AxiosError, UpdateScholarshipDto>) => {
  return useMutation<Scholarship, AxiosError, UpdateScholarshipDto>({
    mutationKey:["create-scholarship"],
    mutationFn: (data) => updateScholarship(scholarshipId, data),
    onError:() => toast.error("Error al actualizar la beca"),
    onSuccess: () => toast.success("Beca actualizada exitosamente."),
    ...options
  })
}

export default useUpdateScholarship
import { updateStudent } from "@/services/student-service";
import type { UpdateStudentDto } from "@/types/student/dto/update-student.dto";
import type { Student } from "@/types/student/Student";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const useUpdateStudent = (id: Student["id"], options?: UseMutationOptions<Student, AxiosError, UpdateStudentDto>) => {
  return useMutation<Student, AxiosError, UpdateStudentDto>({
    mutationKey: ["update-student", id],
    mutationFn: (data) => updateStudent(id, data),
    onSuccess: () => {
      toast.success(`Estudiante actualizado con éxito.`);
    },
    onError: () => {
      toast.error(`Error al actualizar el estudiante`);
    },
    ...options,
  });
};

export default useUpdateStudent;

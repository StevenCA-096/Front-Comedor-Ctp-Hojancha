import { getStudentEnrollmentById } from "@/services/student_enrollment-service"
import type { StudentEnrollment } from "@/types/student-enrollment/student-enrollment.entity"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useStudentEnrollmentById = (id: StudentEnrollment['id']) => {
  return useQuery<StudentEnrollment, AxiosError, StudentEnrollment>({
    queryKey:['student-enrollment', id],
    queryFn: () => getStudentEnrollmentById(id),
    enabled: !!id || id > 0,
  })
}

export default useStudentEnrollmentById
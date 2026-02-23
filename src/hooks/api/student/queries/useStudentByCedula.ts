import { getStudentByCedula } from "@/services/student-service"
import type { StudentReportDto } from "@/types/student/dto/student-report.dto"
import type { Student } from "@/types/student/Student"
import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const useStudentByCedula = (cedula: Student['cedula']) => {
  return useQuery<StudentReportDto, AxiosError>({
    queryKey: ['student-cedula', cedula],
    queryFn: () => getStudentByCedula(cedula),
    enabled: !!cedula || cedula !=0
  })
}

export default useStudentByCedula
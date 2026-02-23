// useCreateStudentEnrollment.ts
import { createStudentEnrollmentWithNoAppointment } from "@/services/student_enrollment-service";
import type { CreateStudentEnrollmentDtoWithNoAppointmentDto } from "@/types/student-enrollment/dto/create-student_enrollment_no_appointment";
import type { StudentEnrollment } from "@/types/student-enrollment/student-enrollment.entity";
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import toast from "react-hot-toast";

const useCreateStudentEnrollment = () => {
    return useMutation<StudentEnrollment, AxiosError, CreateStudentEnrollmentDtoWithNoAppointmentDto>({
        mutationFn: (studentEnrollment ) =>
            createStudentEnrollmentWithNoAppointment(studentEnrollment),
        mutationKey: ['create-student-enrollment'],
        onError:(err)=>{
            if (err.status == 409) {
                return toast.error('El estudiante se encuentra matriculado.')
            }
            return toast.error('Error al finalizar la matrícula')
        }
    })
}

export default useCreateStudentEnrollment
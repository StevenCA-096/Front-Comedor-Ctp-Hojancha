import { api } from "../api/api";
import type { CreateStudentEnrollmentDtoWithNoAppointmentDto } from "@/types/student-enrollment/dto/create-student_enrollment_no_appointment";
import type { StudentEnrollment } from "@/types/student-enrollment/student-enrollment.entity";
import type { Student } from "@/types/student/Student";
import type { UpdateStudentEnrollmentDto } from "@/types/student-enrollment/dto/update-student_enrollment.dto";
import type { Enrollment } from "@/types/enrollment/enrollment.entity";

export const createStudentEnrollmentWithNoAppointment = async (StudentEnrollment: CreateStudentEnrollmentDtoWithNoAppointmentDto) => {
    const data = (await api.post(`student-enrollment/create-with-no-appointment`, StudentEnrollment)).data
    return data;
}

export const updateStudentEnrollment = async (id: StudentEnrollment['id'], StudentEnrollment: UpdateStudentEnrollmentDto) => {
    const data = (await api.patch(`student-enrollment/`+id, StudentEnrollment)).data
    return data;
}

export const getStudentEnrollmentById = async (id: StudentEnrollment['id']) => {
    const data = (await api.get(`student-enrollment/${id}`)).data
    return data;
}

//This method verifies if a student has already compconsted an enrollment process and is currently enrolled 
export const verifyStudentForCurrentEnrollment = async (studentId: Student['id'], enrollmentId: Enrollment['id']) => {
    const data = (await api.get(`student-enrollment/verify-student-for-current-enrollment/studentId=${studentId}/enrollmentId=${enrollmentId}`)).data
    return data;
}

//This method is for admins to get student enrollments by cedula
export const getStudentEnrollmentsByCedula = async (cedula: Student['cedula']) => {
    const data = (await api.get(`student-enrollment/cedula/${cedula}`)).data
    return data;
}

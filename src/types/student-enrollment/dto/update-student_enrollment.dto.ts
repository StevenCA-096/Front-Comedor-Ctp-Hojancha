import type { CreateStudentEnrollmentDtoWithNoAppointmentDto } from "./create-student_enrollment_no_appointment";

export type UpdateStudentEnrollmentDto = Partial<CreateStudentEnrollmentDtoWithNoAppointmentDto> & {
  appointmentId?: number;
} 
import { getStudentEnrollmentsByCedula } from '@/services/student_enrollment-service';
import type { StudentEnrollment } from '@/types/student-enrollment/student-enrollment.entity';
import type { Student } from '@/types/student/Student';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const useGetEnrollmentsByStudentCedula = (cedula: Student['cedula']) => {
  return useQuery<StudentEnrollment[], AxiosError>({
    queryFn: () => getStudentEnrollmentsByCedula(cedula),
    queryKey: ['student-enrollments', cedula],
  });
}

export default useGetEnrollmentsByStudentCedula
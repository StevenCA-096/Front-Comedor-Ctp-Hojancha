import type { Appointment } from "../appointment/appointment.entity";
import type { SectionArea } from "../section-area/section-area.entity";
import type { Student } from "../student/Student";

export interface StudentEnrollment {
    id: number;
    isRecursing: boolean;
    student?: Student;
    sectionArea?: SectionArea;
    appointment?: Appointment;
}

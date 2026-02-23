import type { Counter } from "../counter/counter.entity";
import type { StudentEnrollment } from "../student-enrollment/student-enrollment.entity";

export interface Appointment {
    id: number;
    date: Date | string;
    taken: boolean;
    counter?: Counter;
    studentEnrollment?: StudentEnrollment;
}

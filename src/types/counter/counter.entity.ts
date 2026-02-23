import type { Appointment } from "../appointment/appointment.entity";
import type { Enrollment } from "../enrollment/enrollment.entity";

export interface Counter {
    id: number;
    startDate: Date;
    finishDate: Date;
    counterNumber:number
    enrollment?: Enrollment;
    appointments?: Appointment[];
}

import type { Student } from "@/types/student/Student";
import type { Dining } from "../../dining/entities/dining";

export interface DiningStudent {
    id: number
    status: DiningStudentStatus
    timeIn: Date | string
    paymentMethod: PaymentMethods;
    amountPaid: number
    dining?: Dining
    student?: Student
}

export type PaymentMethods = 'Efectivo' | 'SINPE';

export type DiningStudentStatus = 'completado' | 'pagado';

import type { DiningStudentStatus, PaymentMethods } from "../../dining-student/entities/DiningStudent";

export interface AttendanceReportDto {
  diningStudentId: number;
  status: DiningStudentStatus;
  timein: Date;
  paymentMethod: PaymentMethods;
  amountPaid: number;
  diningId: number;
  studentId: number;
  // Dining data
  openingDate: Date;
  closeDate: Date;
  mealTimeType: string;
  price: number;
  // Student data
  cedula: string;
  name: string;
  lastName1: string;
  lastName2: string;
  fullName: string;
}
// This file is for a single dto, just separated in small interfaces for oreder

interface AppointmentStudentDto {
    id: number;
    cedula: string;
    name: string;
    lastName1: string;
    lastName2: string;
}

interface AppointmentStudentEnrollmentDto {
    id: number;
    student: AppointmentStudentDto;
}

interface CounterAppointmentDto {
    id: number;
    date: Date;
    taken: boolean;
    studentEnrollment: AppointmentStudentEnrollmentDto | null;
}

export interface CounterWithAppointmentsDto {
    id: number;
    startDate: Date;
    finishDate: Date;
    counterNumber: number;
    appointments: CounterAppointmentDto[];
}
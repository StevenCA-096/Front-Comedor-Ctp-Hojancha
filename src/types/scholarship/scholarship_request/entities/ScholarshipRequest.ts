import type { Student } from "@/types/student/Student";
import type { Scholarship } from "../../scholarship/entities/scholarship.entity";

export interface ScholarshipRequest {
    id: number;
    requestDate: Date
    //this value is given when an admin gives resoluion to a request
    resolutionDate?: Date
    year: number
    status: ScholarshipRequestStatus
    scholarship?: Scholarship
    student?: Student
}

export type ScholarshipRequestStatus = 'Pendiente' | 'Aprobado' | 'Rechazado'

import type { Student } from "@/types/student/Student";
import type { Admin } from "../admin/admin";

export interface User {
    id: number;
    dni: number;
    email: string;
    roles: string[];    
    status: boolean;
    createdAt: Date;
    admin: Admin;
    student: Student
}
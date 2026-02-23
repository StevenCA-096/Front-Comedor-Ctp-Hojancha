import type { Student } from "@/types/student/Student";
import type { UserRole } from "./enum/user.roles.enum";
import type { Admin } from "@/types/common/admin/admin";

export interface User {
    id: number;
    dni: number;
    email: string;
    roles: UserRole[];    
    status: boolean;
    createdAt: Date;
    admin: Admin;
    student?: Student 
}
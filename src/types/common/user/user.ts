import type { Admin } from "../admin/admin";

export interface User {
    id: number;
    dni: bigint;
    email: string;
    roles: [];    
    status: boolean;
    createdAt: Date;
    admin: Admin;
}
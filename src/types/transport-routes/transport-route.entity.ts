import type { Student } from "../student/Student";

export interface TransportRoute {
    id:number

    name: string

    isActive: boolean

    students?: Student[];
}

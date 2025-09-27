import type { Student } from "./Student";

export interface Responsible {

    id: number;

    cedula: bigint;

    name: string;

    lastName1: string;

    lastName2: string;

    sex: string;

    homePhone: number | null;

    mobilePhone: number | null;

    email: string | null

    occupation: string;

    country: string;

    students?: Student[];
}

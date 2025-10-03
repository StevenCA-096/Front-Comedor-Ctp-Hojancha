import type { Responsible } from "./Responsible";
import type { SocioeconomicInformation } from "./SocioeconomicInformation";

export interface Student {

    id: number;

    cedula: bigint;

    name: string;

    lastName1: string;

    lastName2: string;

    sex: string;

    country: string;

    birthplace: string;

    birthday: Date;

    lastInstitution: string;

    adequacy: string;

    canton: string;

    district: string;

    address: string;

    requireTransport: boolean;

    transportRoute: string;

    personalEmail: string;

    mepEmail: string | null

    isActive: boolean

    responsible: Responsible;

    socioeconomicInformation: SocioeconomicInformation[]
    // studentEnrollment: StudentEnrollment;

    // user:User

    // scholarshipRequests?: ScholarshipRequest[]

    // lunches: DiningStudent[]
}

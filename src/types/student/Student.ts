import type { TransportRoute } from "../transport-routes/transport-route.entity";
import type { Responsible } from "./Responsible";
import type { SocioeconomicInformation } from "./SocioeconomicInformation";

export interface Student {

    id: number;

    cedula: number;

    name: string;

    lastName1: string;

    lastName2: string;

    sex: string;

    country: string;

    birthplace: string;

    birthday: Date | string;

    lastInstitution: string;

    adequacy: string;

    canton: string;

    district: string;

    address: string;

    requireTransport: boolean;

    transportRoute: TransportRoute;

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

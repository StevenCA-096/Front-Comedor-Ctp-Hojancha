import type { ScholarshipRequest } from "../../scholarship_request/entities/ScholarshipRequest";
import type { ScholarshipAvailability } from "../../scholarshipAvailability/entities/scholarshipAvailability";

export interface Scholarship {
    id: number;
    name: string;
    coverage: number;
    scholarship_availabilities?: ScholarshipAvailability[]
    scholarshipRequests?: ScholarshipRequest[]
}
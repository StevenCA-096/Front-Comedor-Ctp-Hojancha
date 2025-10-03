import type { Scholarship } from "../../scholarship/entities/scholarship.entity";

export interface ScholarshipAvailability {
    id: number;
    quota: number;
    year: number;
    scholarship?: Scholarship
}
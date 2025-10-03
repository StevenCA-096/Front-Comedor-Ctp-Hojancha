import type { Scholarship } from "../../scholarship/entities/scholarship.entity";

export interface CreateScholarshipAvailabilityDto {
    id: number;
    quota: number;
    year: number;
    scholarshipID?: Scholarship['id']
}
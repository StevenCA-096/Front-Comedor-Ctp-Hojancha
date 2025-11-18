import type { Scholarship } from "../../scholarship/entities/scholarship.entity";

export interface CreateScholarshipAvailabilityDto {
    quota: number;
    year: number;
    scholarshipId?: Scholarship['id']
}
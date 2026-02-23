import type { Area } from "../area/area.entity";
import type { Section } from "../section/section.entity";
import type { StudentEnrollment } from "../student-enrollment/student-enrollment.entity";

export interface SectionArea {
    id: number;
    quota: number
    name: string
    section?: Section;
    area?: Area;
    StudentsEnrollment?: StudentEnrollment[]
}
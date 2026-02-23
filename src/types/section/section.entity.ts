import type { Enrollment } from "../enrollment/enrollment.entity";
import type { SectionArea } from "../section-area/section-area.entity";

export interface Section {
    id: number;
    name: string;
    quota: number;
    isAided: boolean;
    isNocturnal: boolean;
    version: number;
    enrollment?: Enrollment;
    sectionareas?: SectionArea[];
}

import type { Counter } from "../counter/counter.entity";
import type { Section } from "../section/section.entity";

export interface Enrollment {
    id: number;
    grade: number;
    year: number;
    startDate: Date;
    finishDate: Date;
    isNocturnal: boolean
    sections?: Section[];
    counters?: Counter[];
}

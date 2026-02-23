import type { SectionArea } from "../section-area/section-area.entity";

export interface Area {
    id: number;
    name: string;
    category: AreaCategory;
    status: boolean;
    sectionareas?: SectionArea[];
}

export type AreaCategory = 'taller' | 'especialidad'

import type { AreaCategory } from "../area.entity";

export interface CreateAreaDto {
    name: string;
    category: AreaCategory;
    status:boolean
}

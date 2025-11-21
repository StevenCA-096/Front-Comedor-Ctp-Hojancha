import type { Dining } from "../entities/dining";
import type { MealTimes } from "./CreateDiningDto";

export interface UpdateDiningDto {
    id: Dining['id']
    mealTime?: MealTimes;
    openingDate?: Date | string
    price?: number
    isOpen?: boolean
}




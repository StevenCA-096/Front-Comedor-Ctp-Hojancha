export interface CreateDiningDto {
    mealTime: MealTimes;
    openingDate: Date | string
    price: number
}

export type MealTimes = 'Almuerzo' | 'Cena';



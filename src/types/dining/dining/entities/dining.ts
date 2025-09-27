import type { DiningStudent } from "../../dining-student/entities/DiningStudent";

export interface Dining {
    id: number

    openingDate: Date | string

    closeDate: Date | string | null

    mealTime: string;

    price: number

    diningStudents?: DiningStudent[]
}


// export enum MealTimes {
//   ALMUERZO = 'Almuerzo',
//   CENA = 'Cena'
// }
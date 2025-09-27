import type DayStatsDto from "./MealTimeStatsDto";
import type { PaymentStats } from "./PaymentStats";

export interface DiningDetailsDto {
    lunch:  DayStatsDto | null,
    dinner: DayStatsDto | null,
    combined: {
        totalStudents: number,
        expectedRevenue: number,
        totalRevenue: number,
        totalAssistances: number,
        paymentStats: PaymentStats
    }
}
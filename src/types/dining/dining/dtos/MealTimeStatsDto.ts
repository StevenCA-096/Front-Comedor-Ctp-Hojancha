import type { Dining } from "../entities/dining";
import type { PaymentStats } from "./PaymentStats";

export default interface MealtimeStatsDto {
    totalStudents: number,
    expectedRevenue: number,
    totalRevenue: number,
    totalAssistances: number,
    paymentStats: PaymentStats,
    isOpen: boolean,
    dining: Dining
}

export const createEmptyMealtimeStats = (): MealtimeStatsDto => ({
    totalStudents: 0,
    expectedRevenue: 0,
    totalRevenue: 0,
    totalAssistances: 0,
    paymentStats: {
        Efectivo:0,
        SINPE:0
    },
    isOpen: true,
    dining: {
        id: 0,
        openingDate: new Date().toISOString().split('T')[0],
        closeDate: null,
        mealTime: '',
        price: 0,
        diningStudents: []
    }
});
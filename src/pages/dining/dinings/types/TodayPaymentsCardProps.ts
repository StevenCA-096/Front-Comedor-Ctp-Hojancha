import type MealTimeStats from "@/types/dining/dining/dtos/MealTimeStatsDto";

export interface TodayPaymentsCardProps {
  data: MealTimeStats | null | undefined,
  error: boolean,
  refetch?: () => void,
  loading?: boolean
}
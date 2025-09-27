import type DayStats from "@/types/dining/dining/dtos/MealTimeStatsDto";
import { createContext, useContext } from "react";

interface DashboardContextData {
    todayData: DayStats | null, 
    error: Error | null, 
    todayDataLoading: boolean
}

export const DashboardContext = createContext<DashboardContextData>({
    error:null,
    todayData: null,
    todayDataLoading:false
})

export const useDashboardContext = () => {
    const data = useContext(DashboardContext)
    return data
}
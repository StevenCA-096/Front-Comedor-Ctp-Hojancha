export interface mainChartData {
    lunch: mealTimeData[],
    dinner: mealTimeData[]
}

interface mealTimeData {
    date: string,
    assistances: number,
    revenue: number
}

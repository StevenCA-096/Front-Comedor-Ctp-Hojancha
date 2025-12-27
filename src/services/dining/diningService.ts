import { api } from "../../api/api";
import type { Dining } from "@/types/dining/dining/entities/dining";
import type { DiningDetailsDto } from "@/types/dining/dining/dtos/DiningDetailsDto";
import type MealtimeStatsDto from "@/types/dining/dining/dtos/MealTimeStatsDto";
import type { CreateDiningDto } from "@/types/dining/dining/dtos/CreateDiningDto";
import type { UpdateDiningDto } from "@/types/dining/dining/dtos/UpdateDiningDto";
import type { mealTimesForReport } from "@/types/dining/dining/dtos/MealtimesForReport";
import type { AttendanceReportDto } from "@/types/dining/dining/dtos/attendance-report,dto";

//=== DINING ATTENDANCES BY DATE RANGE
export const getDiningAttendancesByDateRange = async(startDate: string, endDate: string, mealTime: mealTimesForReport): Promise<AttendanceReportDto[]> => {
    const { data } = await api.get<any>(`dining/attendance-report/startDate/${startDate}/endDate/${endDate}/mealTime/${mealTime}`);
    return data;
}

//=== DINING REPORTS BY DATE RANGE
export const getDiningReportByDateRange = async(startDate: string, endDate: string) => {
    const { data } = await api.get<any>(`dining/report/startDate/${startDate}/endDate/${endDate}`);
    return data;
}

//=== GETS ALL DININGS FROM API
export const getDinings = async() => {
    const { data } = await api.get<Dining[]>('dining');
    return data;
}

//=== GETS A DINING BY ID FROM API
export const getDiningById = async (id: number) => {
    const { data } = await api.get<Dining>(`dining/${id}`);
    return data;
}

//=== GETS STATS BY ID BUT IT WILL BRING ALSO THE WHOLE DAY STATS,  
// SO STATS FOR LUNCH AND DINNER WILL BE INCLUDED
export const getStatsById = async(id: number) => {
    const { data } = await api.get<DiningDetailsDto>(`dining/diningId/${id}`);
    return data;
}

//=== GETS STATS FOR A MEALTIME OF TODAY
export const getTodayStats = async(mealTime: string) => {
    const { data } = await api.get<MealtimeStatsDto>(`dining/today/${mealTime}/stats`);
    return data;
}

//=== CREATES A NEW DINING
export const createDining = async (formData: CreateDiningDto) => {
    const { data } = await api.post('dining', formData);
    console.log(data);
    return data;
}

//=== UPDATES A NEW DINING
export const updateDining = async (id: Dining['id'], formData: UpdateDiningDto) => {
    const { id: _removed, ...cleanData } = formData; // delete id
    const { data } = await api.patch('dining/'+id, cleanData);
    return data;
}
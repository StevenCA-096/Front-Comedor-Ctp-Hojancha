import type { Student } from "./Student";

export interface SocioeconomicInformation {
    id: number;
    membersCount: number
    monthlyIncome: number
    year: number
    perCapitaIncome: number
    housingType: HousingType
    hasDisease?: boolean
    diseaseDescription: string
    student?: Student
}

type HousingType = 'alquilada' | 'propia' | 'propia' 

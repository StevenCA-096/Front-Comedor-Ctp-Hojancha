export interface CreateEnrollmentDto {
    grade: number;

    year: number;

    startDate: Date | string;
    
    finishDate: Date | string;

    isNocturnal: boolean;

}

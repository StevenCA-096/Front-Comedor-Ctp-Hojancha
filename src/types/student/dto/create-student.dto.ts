export interface CreateStudentDto {
    
    cedula: number;

    name: string;

    lastName1: string;

    lastName2: string;

    sex: string;

    country: string;

    birthplace: string;

    birthday: Date;

    lastInstitution: string;

    adequacy: string;

    canton: string;

    district: string;

    address: string;

    requireTransport: boolean;

    transportRouteId: number;

    personalEmail: string;

    mepEmail: string;

    userId: number

    responsibleId: number

}

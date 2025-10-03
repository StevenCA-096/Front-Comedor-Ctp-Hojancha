import type { createDiningStudentDto } from "@/types/dining/dining-student/dtos/createDiningStudentDto";
import { api } from "../../api/api";

//===DIRECTION AND DINING ROOM -- GETS THE PAYMENT INFO, LIKE AMOUNT TO PAY, IF HAS PAY, ETC
export const getStudentPaymentInfo = async(cedula: number, diningId: number) => {
    const { data } = await api.get(`dining-student/payment-info/${cedula}/${diningId}`);
    return data;
}

//===DIRECTION --- CONFIRMS STUDENT PAYMENT
export const confirmStudentPaymentForToday = async(formdata: createDiningStudentDto) => {
    const { data } = await api.post('dining-student/confirm-payment', formdata);
    console.log(data);
    return data;
}

//===DINING ROOM --- CONFIRMS STUDENT ASSISTANCE
export const confirmStudentAssistance = async(id: number) => {
    const { data } = await api.patch(`dining-student/confirm-assistance/${id}`);
    console.log(data);
    return data;
}

//LOADS DASHBOARD DATA
export const getDasboardData = async() => {
    const { data } = await api.get('dining-student/dashboard-data');
    return data;
}
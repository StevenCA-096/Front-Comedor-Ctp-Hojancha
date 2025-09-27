import type { PaymentMethods } from "../entities/DiningStudent";

//For the form wich only requires the payment method and amount paid
export interface DiningStudentFormData {
    paymentMethod: PaymentMethods;
    amountPaid: number;
}

//data structure for http request
export interface createDiningStudentDto extends DiningStudentFormData {
    diningId: number,
    studentCedula: number
}


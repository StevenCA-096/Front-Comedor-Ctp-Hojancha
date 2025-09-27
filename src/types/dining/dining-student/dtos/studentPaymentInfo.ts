import type { StudentBriefInfo } from "@/types/student/StudentBriefInfo"

export default interface StudentPaymentInfo {
    student: StudentBriefInfo
    amountToPay: number,
    total: number,
    hasPay: boolean,
    coverage: number,
    scholarshipActive: boolean,
    diningId: number,
    diningStudentId: {
        id:number
    },
    hasAssisted?: boolean
}

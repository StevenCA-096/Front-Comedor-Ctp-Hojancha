import type { CreateEnrollmentDto } from "./create-enrollment.dto";

// 1. Partial - hace todo opcional (igual que PartialType de NestJS)
export type UpdateEnrollemtnDto = Partial<CreateEnrollmentDto> 
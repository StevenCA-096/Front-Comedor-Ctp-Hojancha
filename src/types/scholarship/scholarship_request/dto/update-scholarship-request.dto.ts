import type { ScholarshipRequestStatus } from "../entities/ScholarshipRequest";
import type { CreateScholarshipRequestDto } from "./create-scholarship_request.dto";

// 1. Partial - hace todo opcional (igual que PartialType de NestJS)
export type UpdateScholarshipRequestDto = Partial<CreateScholarshipRequestDto> & {
  status?: ScholarshipRequestStatus;
}
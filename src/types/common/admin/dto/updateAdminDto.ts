import type { CreateAdminDto } from "./createAdminDto";

// 1. Partial - hace todo opcional (igual que PartialType de NestJS)
export type UpdateAdminDto = Partial<CreateAdminDto> 
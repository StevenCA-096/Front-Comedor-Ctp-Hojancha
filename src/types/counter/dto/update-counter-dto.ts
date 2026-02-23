import type { CreateCounterDto } from "./create-counter.dto";

// 1. Partial - hace todo opcional (igual que PartialType de NestJS)
export type UpdateCounterDto = Partial<CreateCounterDto> 
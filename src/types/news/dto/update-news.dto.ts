import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsInt({ each: true, message: 'IDs tags must be INT' })
  @IsOptional()
  tagIds?: number[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
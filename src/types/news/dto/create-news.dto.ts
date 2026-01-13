import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional, ArrayMinSize, IsInt } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Debe incluir al menos un tag' })
  @IsInt({ each: true, message: 'Los IDs de tags deben ser números enteros' })
  tagIds: number[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  summary?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsNumber({}, { each: true }) // cada elemento del array debe ser un número
  @IsOptional()
  categoryIds?: number[];
}

import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ description: 'The title of the post' })
  title!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The content of the post' })
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ description: 'The summary of the post' })
  summary?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The cover image URL of the post' })
  coverImage?: string;

  @IsArray()
  @IsNumber({}, { each: true }) // cada elemento del array debe ser un número
  @IsOptional()
  @ApiProperty({ description: 'The category IDs associated with the post' })
  categoryIds?: number[];
}

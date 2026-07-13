import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the profile' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the profile' })
  lastName!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({ description: 'The avatar URL of the profile' })
  avatar?: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}

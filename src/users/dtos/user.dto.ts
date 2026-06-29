import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './profile.dto';
import { UpdateProfileDto } from './profile.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @ValidateNested() // le decimos que va a validar un objeto anidado
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested() // le decimos que va a validar un objeto anidado
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile!: UpdateProfileDto;
}

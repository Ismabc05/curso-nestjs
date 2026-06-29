import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, ValidateNested } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

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

export class UpdateUserDto {
  @IsString() // Asegura que el nombre sea una cadena de texto
  @IsOptional() // Asegura que el nombre no esté vacío
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;
}

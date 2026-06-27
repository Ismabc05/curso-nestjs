import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, ValidateNested } from 'class-validator';

// Un DTO en NestJS es una clase que representa la estructura de los datos que espera un endpoint, y mediante decoradores puedes declarar las reglas de validación para evitar hacer comprobaciones manuales.

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
  @IsString() // Asegura que el nombre sea una cadena de texto
  @IsNotEmpty() // Asegura que el nombre no esté vacío
  @MinLength(8)
  password!: string;

  @IsEmail() // Asegura que el correo electrónico tenga un formato válido
  @IsString() // Asegura que el correo electrónico sea una cadena de texto
  email!: string;

  @ValidateNested()
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

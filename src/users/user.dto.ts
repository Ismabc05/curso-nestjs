import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

// Un DTO en NestJS es una clase que representa la estructura de los datos que espera un endpoint, y mediante decoradores puedes declarar las reglas de validación para evitar hacer comprobaciones manuales.

export class CreateUserDto {
  @IsString() // Asegura que el nombre sea una cadena de texto
  @IsNotEmpty() // Asegura que el nombre no esté vacío
  name!: string;

  @IsEmail() // Asegura que el correo electrónico tenga un formato válido
  @IsString() // Asegura que el correo electrónico sea una cadena de texto
  email!: string;
}

export class UpdateUserDto {
  @IsOptional() // Permite que el campo sea opcional
  @IsString() // Asegura que el nombre sea una cadena de texto
  @IsNotEmpty() // Asegura que el nombre no esté vacío
  name?: string;

  @IsOptional() // Permite que el campo sea opcional
  @IsEmail() // Asegura que el correo electrónico tenga un formato válido
  @IsString() // Asegura que el correo electrónico sea una cadena de texto
  email?: string;
}

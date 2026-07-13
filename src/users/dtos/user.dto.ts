import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './profile.dto';
import { UpdateProfileDto } from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: 'The password of the user' })
  password!: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ description: 'The email of the user' })
  email!: string;

  @ValidateNested() // le decimos que va a validar un objeto anidado
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  @ApiProperty({ description: 'The profile of the user' })
  profile!: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested() // le decimos que va a validar un objeto anidado
  @Type(() => UpdateProfileDto)
  @IsOptional()
  @ApiProperty({ description: 'The profile of the user' })
  profile!: UpdateProfileDto;
}

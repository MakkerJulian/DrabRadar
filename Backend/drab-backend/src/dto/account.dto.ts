import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['ADMIN', 'Onderzoek', 'Sales', 'Onderhoud'])
  role: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

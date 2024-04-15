import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsNotEmpty()
  id: number;
}

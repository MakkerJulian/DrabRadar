import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @MinLength(10)
  token: string;

  @IsNotEmpty()
  @IsNumber()
  customer: number;
}

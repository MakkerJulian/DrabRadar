import { IsNotEmpty } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  subscription: number;

  @IsNotEmpty()
  level: number;
}

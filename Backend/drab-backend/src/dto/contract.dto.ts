import { IsNotEmpty } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  subscriptionId: number;

  @IsNotEmpty()
  level: number;

  @IsNotEmpty()
  weatherstations: string[];
}

import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  subscriptionId: number;

  @IsNotEmpty()
  @IsIn(['0', '1', '2'])
  level: number;

  @IsNotEmpty()
  weatherstations: string[];
}

export class CreateContractDtoByCountry {
  @IsNotEmpty()
  subscriptionId: number;

  @IsNotEmpty()
  @IsIn(['0', '1', '2'])
  level: number;

  @IsNotEmpty()
  country: string;
}

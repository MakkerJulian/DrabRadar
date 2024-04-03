import { IsNotEmpty } from 'class-validator';

export class CreateWeatherdataDto {
  @IsNotEmpty()
  STN: number;

  @IsNotEmpty()
  DATE: Date;

  @IsNotEmpty()
  TIME: string;

  @IsNotEmpty()
  TEMP: number | string;

  @IsNotEmpty()
  DEWP: number | string;

  @IsNotEmpty()
  STP: number | string;

  @IsNotEmpty()
  SLP: number | string;

  @IsNotEmpty()
  VISIB: number | string;

  @IsNotEmpty()
  WDSP: number | string;

  @IsNotEmpty()
  PRCP: number | string;

  @IsNotEmpty()
  SNDP: number | string;

  @IsNotEmpty()
  FRSHTT: string;

  @IsNotEmpty()
  CLDC: number | string;

  @IsNotEmpty()
  WNDDIR: number | string;
}

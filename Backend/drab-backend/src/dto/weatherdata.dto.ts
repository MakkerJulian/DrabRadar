import { IsNotEmpty} from 'class-validator';

export class CreateWeatherdataDto {
  @IsNotEmpty()
  STN: number;;

  @IsNotEmpty()
  DATE: Date;

  @IsNotEmpty()
  TIME: string;
  
  @IsNotEmpty()
  TEMP: number;

  @IsNotEmpty()
  DEWP: number;

  @IsNotEmpty()
  STP: number;

  @IsNotEmpty()
  SLP: number;

  @IsNotEmpty()
  VISIB: number;

  @IsNotEmpty()
  WDSP: number;

  @IsNotEmpty()
  PRCP: number;

  @IsNotEmpty()
  SNDP: number;

  @IsNotEmpty()
  FRSHTT: string;

  @IsNotEmpty()
  CLDC: number;

  @IsNotEmpty()
  WNDDIR: number;
}
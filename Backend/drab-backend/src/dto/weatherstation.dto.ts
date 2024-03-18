import { IsNotEmpty} from 'class-validator';

export class CreateWeatherstationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    longitude: number;

    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    elevation: number;
}
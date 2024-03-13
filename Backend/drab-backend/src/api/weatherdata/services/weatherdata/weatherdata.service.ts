import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { CreateWeatherdataDto } from 'src/dto/weatherdata.dto';
@Injectable()
export class WeatherdataService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherdataRepository: Repository<WeatherData>,
  ) {}

  createWeatherdata(createWeatherdataDtos: {
    WEATHERDATA: CreateWeatherdataDto[];
  }) {
    const weatherdata_dtos = createWeatherdataDtos.WEATHERDATA.map(
      (createWeatherdataDto) => {
        const datetime = new Date();
        return {
          weatherstation: createWeatherdataDto.STN.toString(),
          datetime: datetime,
          temp: createWeatherdataDto.TEMP,
          dew_point: createWeatherdataDto.DEWP,
          s_airpressure: createWeatherdataDto.STP,
          sea_airpressure: createWeatherdataDto.SLP,
          visibility: createWeatherdataDto.VISIB,
          windspeed: createWeatherdataDto.WDSP,
          precipitation: createWeatherdataDto.PRCP,
          snow_amount: createWeatherdataDto.SNDP,
          freezing: !!+createWeatherdataDto.FRSHTT[0],
          rain: !!+createWeatherdataDto.FRSHTT[1],
          snow: !!+createWeatherdataDto.FRSHTT[2],
          hail: !!+createWeatherdataDto.FRSHTT[3],
          thunder: !!+createWeatherdataDto.FRSHTT[4],
          tornado: !!+createWeatherdataDto.FRSHTT[5],
          clouds: createWeatherdataDto.CLDC,
          wind_direction: createWeatherdataDto.WNDDIR,
        };
      },
    );
    return this.weatherdataRepository.save(weatherdata_dtos);
  }

  findWeatherdataByID(id: number) {
    return this.weatherdataRepository.findOne({ where: { id: id } });
  }

  getWeatherdata() {
    return this.weatherdataRepository.find({
      relations: ['weatherstation'],
    });
  }

  deleteAll() {
    return this.weatherdataRepository.clear();
  }
}

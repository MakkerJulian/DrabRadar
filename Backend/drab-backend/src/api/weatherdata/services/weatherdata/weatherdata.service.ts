import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { CreateWeatherdataDto } from 'src/dto/weatherdata.dto';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
@Injectable()
export class WeatherdataService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherdataRepository: Repository<WeatherData>,
  ) {}

  async createWeatherdata(createWeatherdataDtos: {
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

    weatherdata_dtos.forEach(async (weatherdata_dto) => {
      //get the last 30 temps
      const weatherdatas = await this.weatherdataRepository.find({
        where: {
          weatherstation: { name: weatherdata_dto.weatherstation },
        },
        order: { datetime: 'DESC' },
        take: 30,
      });


      const temps = weatherdatas.map((weatherdata) => {
        return Number(weatherdata.temp);
      });

      if (temps.length >= 30) {
        const x = Array.from(Array(30).keys());
        const y = temps;

        const regression = new SimpleLinearRegression(x, y);
        const prediction = regression.predict(30);
        //calculate percentage difference
        const diff = 100 - (100 / prediction) * weatherdata_dto.temp;
        if (diff > 20) {
          this.weatherdataRepository.insert({
            ...weatherdata_dto,
            weatherstation: { name: weatherdata_dto.weatherstation },
            temp: weatherdata_dto.temp * 1.2,
          });
        } else if (diff < -20) {
          this.weatherdataRepository.insert({
            ...weatherdata_dto,
            weatherstation: { name: weatherdata_dto.weatherstation },
            temp: weatherdata_dto.temp * 0.8,
          });
        } else {
          console.log('data is OK');
          this.weatherdataRepository.insert({
            ...weatherdata_dto,
            weatherstation: { name: weatherdata_dto.weatherstation },
          });
        }
      } else {
        this.weatherdataRepository.insert({
          ...weatherdata_dto,
          weatherstation: { name: weatherdata_dto.weatherstation },
        });
      }
    });
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

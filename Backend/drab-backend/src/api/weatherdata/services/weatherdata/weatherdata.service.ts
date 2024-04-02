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
    const x = Array.from(Array(30).keys());

    console.time('weatherdata');

    const weatherdata_dtos = createWeatherdataDtos.WEATHERDATA.map(
      async (createWeatherdataDto) => {
        const datetime = new Date();
        const weatherdatas = await this.weatherdataRepository.find({
          where: {
            weatherstation: { name: createWeatherdataDto.STN.toString() },
          },
          order: { datetime: 'DESC' },
          take: 30,
        });

        const temps = weatherdatas.map((weatherdata) => {
          return Number(weatherdata.temp);
        });

        let newTemp = createWeatherdataDto.TEMP;

        //todo check for missing values and extrapolate those aswell
        //then make a new table called "storingen" and add the ID of this weatherdata, make this a many to one relation so it can be called both ways
        // or add a new column that contains a string value if there was a 'storing' and what kind of storing it was

        if (temps.length >= 30) {
          const regression = new SimpleLinearRegression(x, temps); //todo maybe faster with own implementation or average values
          const prediction = regression.predict(30);

          //calculate percentage difference
          const diff = 100 - (100 / prediction) * createWeatherdataDto.TEMP;
          if (diff > 20) {
            newTemp = prediction * 0.8;
          } else if (diff < -20) {
            newTemp = prediction * 1.2;
          }
        }
        return {
          weatherstation: { name: createWeatherdataDto.STN.toString() },
          datetime: datetime,
          temp: newTemp,
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
    console.timeEnd('weatherdata');
    this.weatherdataRepository.insert(await Promise.all(weatherdata_dtos));
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

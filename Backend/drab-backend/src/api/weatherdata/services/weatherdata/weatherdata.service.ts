import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { CreateWeatherdataDto } from 'src/dto/weatherdata.dto';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { Storing } from 'src/typeorm/storing.entity';
@Injectable()
export class WeatherdataService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherdataRepository: Repository<WeatherData>,
    @InjectRepository(Storing)
    private readonly storingRepository: Repository<Storing>,
  ) {}

  async createWeatherdata(createWeatherdataDtos: {
    WEATHERDATA: CreateWeatherdataDto[];
  }) {
    const weatherdata_dtos = createWeatherdataDtos.WEATHERDATA.map(
      async (createWeatherdataDto) => {
        const weatherdatas = await this.weatherdataRepository.find({
          where: {
            weatherstation: { name: createWeatherdataDto.STN.toString() },
          },
          order: { datetime: 'DESC' },
          take: 30,
        });

        console.log('INPUT DATA______________', createWeatherdataDto);

        const x = Array.from(Array(weatherdatas.length).keys());

        Object.keys(createWeatherdataDto).map((key) => {
          if (createWeatherdataDto[key] === 'None') {
            const keyId = Object.keys(createWeatherdataDto).indexOf(key) - 1;

            console.log('ID', keyId);
            console.log('missing', key);

            let newValue = 1;
            if (weatherdatas.length > 30) {
              const values = weatherdatas.map((weatherdata) => {
                console.log(Object.keys(weatherdata));
                console.log(Object.keys(weatherdata)[keyId]);
                return Number(weatherdata[Object.keys(weatherdata)[keyId]]);
              });

              const regression = new SimpleLinearRegression(x, values);
              newValue = regression.predict(x.length + 1);
              console.log('prediction', newValue);
            }

            // console.log(key);
            // console.log(Object.keys(createWeatherdataDto).indexOf(key) - 1);
            // console.log(Object.keys(createWeatherdataDto));
            // console.log(Object.keys(weatherdatas[0]));

            createWeatherdataDto[key] = newValue;

            this.storingRepository.insert({
              reason: key + ' missing',
              weatherstation: { name: createWeatherdataDto.STN.toString() },
            });
          }
          if (createWeatherdataDto[key] === Number.NaN) {
            createWeatherdataDto[key] = -9999;
          }
        });

        const temps = weatherdatas.map((weatherdata) => {
          return Number(weatherdata.temp);
        });

        let newTemp = createWeatherdataDto.TEMP;

        if (temps.length >= 30) {
          if (typeof createWeatherdataDto.TEMP === 'number') {
            const regression = new SimpleLinearRegression(x, temps);
            const prediction = regression.predict(30);

            //calculate percentage difference
            const diff = 100 - (100 / prediction) * createWeatherdataDto.TEMP;
            if (diff > 20) {
              newTemp = prediction * 0.8;
            } else if (diff < -20) {
              newTemp = prediction * 1.2;
            }
          }
        }

        return {
          weatherstation: { name: createWeatherdataDto.STN.toString() },
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
    const weather_datas = await Promise.all(weatherdata_dtos);
    console.log('OUTPUT_DATA________________', weather_datas);
    this.weatherdataRepository.insert(weather_datas as WeatherData[]);
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

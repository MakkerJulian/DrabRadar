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
        //Fomat ruwe data
        const newWeatherdata = {
          weatherstation: { name: createWeatherdataDto.STN.toString() },
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

        //haal de laatste 30 gegevens op voor deze station
        const weatherdatas = await this.weatherdataRepository.find({
          where: {
            weatherstation: { name: createWeatherdataDto.STN.toString() },
          },
          order: { datetime: 'DESC' },
          take: 30,
        });

        //maak een lijst van 0 tot de lengte van de weergegevens opgesalgen
        const x = Array.from(Array(weatherdatas.length).keys());

        //loop door alle waardes en controleer of ze niet None zijn, zo ja voorspel de waarde, als de weerdata langer is dan 30 zet de waarde op -99999
        Object.keys(newWeatherdata).map((key) => {
          if (newWeatherdata[key] === 'None') {
            const keyId = Object.keys(newWeatherdata).indexOf(key) - 1;

            let newValue = 1;
            if (weatherdatas.length > 30) {
              const values = weatherdatas.map((weatherdata) => {
                return Number(weatherdata[Object.keys(weatherdata)[keyId]]);
              });

              const regression = new SimpleLinearRegression(x, values);
              newValue = regression.predict(x.length + 1);
            }

            newWeatherdata[key] = newValue;

            this.storingRepository.insert({
              reason: key + ' missing',
              weatherstation: { name: createWeatherdataDto.STN.toString() },
            });
          }
          if (newWeatherdata[key] === Number.NaN) {
            newWeatherdata[key] = -9999;
          }
        });

        //Maak een lijst met afgelopen tempreturen
        const temps = weatherdatas.map((weatherdata) => {
          return Number(weatherdata.temp);
        });

        //Maak een nieuwe tempreture aan met als basis de tempreture van de nieuwe data
        let newTemp = createWeatherdataDto.TEMP;

        //Als er meer dan 30 gegevens zijn voorspel de tempreture
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
        return { ...newWeatherdata, temp: newTemp };
      },
    );
    const weather_datas = await Promise.all(weatherdata_dtos);

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
  findByStation(stationNumber) {
    return this.weatherdataRepository.find({
      where: { weatherstation: { name: stationNumber } },
      order: {
        datetime: 'DESC',
      },
    });
  }
}

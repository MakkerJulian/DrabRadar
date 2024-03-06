import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherstationData } from 'src/typeorm/weatherstationdata.entity';
import { CreateWeatherstationdataDto } from 'src/dto/weatherstationdata.dto';

@Injectable()
export class WeatherstationdataService {
  constructor(
    @InjectRepository(WeatherstationData)
    private readonly weatherstationdataRepository: Repository<WeatherstationData>,
  ) {}

  createWeatherstationdata(createWeatherstationdataDto: CreateWeatherstationdataDto) {
    console.log(new Date().toDateString())
    console.log(createWeatherstationdataDto.DATE)
    console.log(createWeatherstationdataDto.TIME)
    const time = createWeatherstationdataDto.TIME.split(":");
    const datetime = new Date( createWeatherstationdataDto.DATE  + "T" + time[0] + ":"+time[1]+":"+time[2]);
    console.log( typeof datetime)
    console.log(datetime)
    const newweatherstationdata = {
        weatherstation:  createWeatherstationdataDto.STN,
        datetime: datetime,
        temp: createWeatherstationdataDto.TEMP,
        dew_point: createWeatherstationdataDto.DEWP,
        s_airpressure: createWeatherstationdataDto.STP,
        sea_airpressure: createWeatherstationdataDto.SLP,
        visibility: createWeatherstationdataDto.VISIB,
        windspeed: createWeatherstationdataDto.WDSP,
        precipitation: createWeatherstationdataDto.PRCP,
        snow_amount: createWeatherstationdataDto.SNDP,
        freezing: !!+createWeatherstationdataDto.FRSHTT[0],
        rain: !!+createWeatherstationdataDto.FRSHTT[1],
        snow: !!+createWeatherstationdataDto.FRSHTT[2],
        hail: !!+createWeatherstationdataDto.FRSHTT[3],
        thunder: !!+createWeatherstationdataDto.FRSHTT[4],
        tornado: !!+createWeatherstationdataDto.FRSHTT[5],
        clouds: createWeatherstationdataDto.CLDC,
        wind_direction: createWeatherstationdataDto.WNDDIR
    }
    return this.weatherstationdataRepository.save(newweatherstationdata);
  }

  findWeatherstationdataByID(id: number) {
    return this.weatherstationdataRepository.findOne({ where: { id } });
  }

  getWeatherstationdata() {
    return this.weatherstationdataRepository.find();
  }

  deleteAll() {
    return this.weatherstationdataRepository.clear();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionService } from 'src/api/subscription/services/subscription/subscription.service';
import { WeatherdataService } from 'src/api/weatherdata/services/weatherdata/weatherdata.service';
import { station } from 'src/seed';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherstationService {
  constructor(
    @InjectRepository(Weatherstation)
    private readonly weatherstationRepository: Repository<Weatherstation>,
    private weatherDataService: WeatherdataService,
    private subscriptionService: SubscriptionService,
  ) { }

  async findByName(id: string) {
    return this.weatherstationRepository.findOne({
      where: { name: id },
      relations: ['geolocation', 'geolocation.country', 'weatherdatas'],
    });
  }

  getWeatherstations() {
    return this.weatherstationRepository.find({
      relations: ['geolocation', 'geolocation.country', 'weatherdatas'],
    });
  }

  async getWeatherstationsDetails() {
    const allStations = await this.getWeatherstations();
    const count = allStations.length;
    const offsets = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * count),
    );
    const offsetslist = offsets.filter(
      (value, index) => offsets.indexOf(value) === index,
    );
    const randoms = offsetslist.map((index) => {
      return allStations[index];
    });
    const allStations1Data = randoms.map((station) => {
      return {
        ...station,
        weatherdatas: station.weatherdatas[0] || null
      }
    })
    return allStations1Data;
  }

  async seedWeatherstations() {
    const newWeatherstations = station.map((station) => {
      return {
        name: station.name,
        longitude: station.longitude,
        latitude: station.latitude,
        elevation: station.elevation,
      };
    });
    return this.weatherstationRepository.save(newWeatherstations);
  }
  // async getExtern(token: string, latitude: number, longitude: number, elevation: number) {
  //   const subscription = await this.subscriptionService.getByToken(token);
  //   let allowedStations = subscription.contracts.map(contract => {
  //     return contract.weatherstations;
  //   }).flat();

  //   const lat = latitude ?? 0;
  //   const long = longitude ?? 0;
  //   const elev = elevation ?? 0;

  //   // filters toepassen
  //   allowedStations = allowedStations.filter(station => {
  //     return station.latitude <= lat;
  //     //Filterd alle stations die een latitude hebben die kleiner is dan de gegeven latitude, 
  //     //dus returnt alle stations die ten noorden van de gegeven latitude liggen
  //   });

  //   allowedStations = allowedStations.filter(station => {
  //     return station.longitude <= long;
  //   });


  //   allowedStations = allowedStations.filter(station => {
  //     return station.elevation <= elev;
  //   });
  //   console.log(allowedStations);


  //   //Loop door alle stations heen
  //   // Pak (bvb) de laatse 30 weergegevens van die station met .flat()
  //   // Return dit
  //    // Retrieve weather data from WeatherDataService
  //    const stationData = await Promise.all(allowedStations.map(async station => {
  //     const latestWeatherData = await this.weatherDataService.getLatestWeatherDataForStation(station);
  //     return {
  //       station,
  //       latestWeatherData,
  //     };
  //   }));

  //   return stationData;
  // }
}


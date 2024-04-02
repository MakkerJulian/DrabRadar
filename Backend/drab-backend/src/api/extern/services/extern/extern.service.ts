import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubscriptionService } from 'src/api/subscription/services/subscription/subscription.service';
import { WeatherdataService } from 'src/api/weatherdata/services/weatherdata/weatherdata.service';


@Injectable()
export class ExternService {
    constructor(
        private subscriptionService: SubscriptionService,
        private weatherDataService: WeatherdataService,
    ) {}




async get(token: string, latitude: number, longitude: number, elevation: number) {
    const subscription = await this.subscriptionService.getByToken(token);
    let allowedStations = subscription.contracts.map(contract => {
      return contract.weatherstations;
    }).flat();

    const lat = latitude ?? 0;
    const long = longitude ?? 0;
    const elev = elevation ?? 0;

    // filters toepassen
    allowedStations = allowedStations.filter(station => {
      return station.latitude <= lat;
      //Filterd alle stations die een latitude hebben die kleiner is dan de gegeven latitude, 
      //dus returnt alle stations die ten noorden van de gegeven latitude liggen
    });

    allowedStations = allowedStations.filter(station => {
      return station.longitude <= long;
    });


    allowedStations = allowedStations.filter(station => {
      return station.elevation <= elev;
    });
    console.log(allowedStations);


    //Loop door alle stations heen
    // Pak (bvb) de laatse 30 weergegevens van die station met .flat()
    // Return dit
     // Retrieve weather data from WeatherDataService
     const stationData = await Promise.all(allowedStations.map(async station => {
      const latestWeatherData = await this.weatherDataService.getLatestWeatherDataForStation(station);
      return {
        station,
        latestWeatherData,
      };
    }));

    return stationData;
  }
}


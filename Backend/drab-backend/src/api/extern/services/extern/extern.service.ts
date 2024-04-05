import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SubscriptionService } from 'src/api/subscription/services/subscription/subscription.service';
import { WeatherdataService } from 'src/api/weatherdata/services/weatherdata/weatherdata.service';

@Injectable()
export class ExternService {
  constructor(
    private subscriptionService: SubscriptionService,
    private weatherDataService: WeatherdataService,
  ) {}

  async get(
    token: string,
    latitude: number,
    longitude: number,
    elevation: number,
  ) {
    const newToken = token ?? '1';
    const subscription = await this.subscriptionService.getByToken(newToken);

    if (!subscription) return new UnauthorizedException();

    let allowedStations = subscription.contracts
      .map((contract) => {
        return contract.weatherstations;
      })
      .flat();

    const lat = latitude ?? -1;
    const long = longitude ?? -1;
    const elev = elevation ?? 0;

    // console.log(allowedStations);

    allowedStations = allowedStations.map((station) => {
      // console.log(station.latitude, lat, typeof(station.latitude), typeof(lat), Math.round(station.latitude) >= lat);
      // console.log(station.longitude, long, typeof(station.longitude), typeof(long), station.longitude >= long);
      // console.log(station.elevation, elev, typeof(station.elevation), typeof(elev), station.elevation >= elev);

      if (
        Math.round(station.latitude) >= lat &&
        Math.round(station.longitude) >= long &&
        Math.round(station.elevation) >= elev
      )
        return station;
    });

    allowedStations = allowedStations.filter((station) => station);

    const allowedStationsWithData = Promise.all(
      allowedStations.map(async (station) => {
        return await this.weatherDataService.findByStation(station.name);
      }),
    );

    const data = (await allowedStationsWithData).flat();

    console.log(data);

    return data;
  }
}

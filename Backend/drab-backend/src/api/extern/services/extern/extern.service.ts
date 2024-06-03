import { ImATeapotException, Injectable } from '@nestjs/common';
import { ContractService } from 'src/api/contract/services/contract/contract.service';
import { SubscriptionService } from 'src/api/subscription/services/subscription/subscription.service';
import { WeatherdataService } from 'src/api/weatherdata/services/weatherdata/weatherdata.service';

@Injectable()
export class ExternService {
  constructor(
    private subscriptionService: SubscriptionService,
    private weatherDataService: WeatherdataService,
    private contractService: ContractService,
  ) {}

  dateDiffInDays(a, b) {
    if (b === null) return 8;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  async get(
    token: string,
    latitude: number,
    longitude: number,
    elevation: number,
    country: string,
  ) {
    const newToken = token ?? '1';
    const subscription = await this.subscriptionService.getByToken(newToken);

    if (!subscription) return new ImATeapotException('No subscription found');

    let allowedStations = subscription.contracts
      .map((contract) => {
        // console.log(
        //   Math.abs(this.dateDiffInDays(new Date(), contract.lastCallDate)),
        // );
        // console.log(contract.level);
        // console.log(
        //   Math.abs(this.dateDiffInDays(new Date(), contract.lastCallDate)) <
        //     7 && contract.level < 2,
        // );
        if (
          //mag niet meer dan 1 keer per week voor level 1 en 2
          Math.abs(this.dateDiffInDays(new Date(), contract.lastCallDate)) <
            7 &&
          contract.level < 2
        ) {
          return;
        }
        this.contractService.updateLastCallDate(contract.id);
        return contract.weatherstations;
      })
      .filter((station) => station)
      .flat();

    // console.log(allowedStations);

    const lat = latitude ?? -1;
    const long = longitude ?? -1;
    const elev = elevation ?? 0;

    allowedStations = allowedStations.filter((station) => {
      // console.log(station.latitude, lat, typeof(station.latitude), typeof(lat), Math.round(station.latitude) >= lat);
      // console.log(station.longitude, long, typeof(station.longitude), typeof(long), station.longitude >= long);
      // console.log(station.elevation, elev, typeof(station.elevation), typeof(elev), station.elevation >= elev);

      return (
        Math.round(station.latitude) >= lat &&
        Math.round(station.longitude) >= long &&
        Math.round(station.elevation) >= elev
      );
    });

    if (country) {
      allowedStations = allowedStations.filter(
        (station) => station.geolocation.country.name === country,
      );
    }

    allowedStations = allowedStations.filter((station) => station);

    const allowedStationsWithData = Promise.all(
      allowedStations.map(async (station) => {
        return await this.weatherDataService.findByStation(station.name);
      }),
    );
    const data = (await allowedStationsWithData).flat();

    // console.log(data);

    return data;
  }
}

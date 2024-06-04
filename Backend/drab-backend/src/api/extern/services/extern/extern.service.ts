import {
  ImATeapotException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

    if (!subscription) throw new UnauthorizedException('No subscription found');

    const lat = latitude ?? -1;
    const long = longitude ?? -1;
    const elev = elevation ?? 0;

    let allowedStations = subscription.contracts
      .map((contract) => {
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

    allowedStations = allowedStations.filter((station) => station);

    let data = await this.weatherDataService.findBy(country, lat, long, elev);
    data = data.filter((weatherdata) => {
      return allowedStations.some(
        (station) => station.name === weatherdata.weatherstation.name,
      );
    });
    // console.log(data);

    return data;
  }

  async getCountry(
    token: string,
    country: string,
  ) {
    const newToken = token ?? '1';
    const subscription = await this.subscriptionService.getByToken(newToken);

    if (!subscription) throw new UnauthorizedException('No subscription found');


    let allowedStations = subscription.contracts
      .map((contract) => {
        this.contractService.updateLastCallDate(contract.id);
        return contract.weatherstations;
      })
      .filter((station) => station)
      .flat();

    allowedStations = allowedStations.filter((station) => station);

    let data = await this.weatherDataService.findBy(country, lat, long, elev);
    data = data.filter((weatherdata) => {
      return allowedStations.some(
        (station) => station.name === weatherdata.weatherstation.name,
      );
    });
    // console.log(data);

    return data;
  }
}

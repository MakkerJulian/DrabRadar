import { Injectable } from '@nestjs/common';
import { CountryService } from './api/country/services/country/country.service';
import { WeatherstationService } from './api/weatherstation/services/weatherstation/weatherstation.service';
import { GeolocationService } from './api/geolocation/services/geolocation/geolocation.service';
import { NearestlocationService } from './api/nearestlocation/services/nearestlocation/nearestlocation.service';
import { CustomerService } from './api/customer/services/customer/customer.service';
import { AccountService } from './api/account/services/account/account.service';
import { SubscriptionService } from './api/subscription/services/subscription/subscription.service';
import { ContractService } from './api/contract/services/contract/contract.service';
import { WeatherdataService } from './api/weatherdata/services/weatherdata/weatherdata.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countryService: CountryService,
    private readonly weatherstationService: WeatherstationService,
    private readonly geolocationService: GeolocationService,
    private readonly nearestlocationService: NearestlocationService,
    private readonly customerService: CustomerService,
    private readonly accountServie: AccountService,
    private readonly subscriptionService: SubscriptionService,
    private readonly contractService: ContractService,
    private readonly weatherdataService: WeatherdataService,
  ) {
    this.seedDatabase();
  }

  async seedDatabase() {
    if ((await this.countryService.getCountry()).length === 0) {
      await this.countryService.seedCountries();
      console.log('Seeded countries');
    }

    if ((await this.weatherstationService.getWeatherstations()).length === 0) {
      await this.weatherstationService.seedWeatherstations();
      console.log('Seeded weatherstations');
    }
    if ((await this.geolocationService.getGeolocation()).length === 0) {
      await this.geolocationService.seedGeoLocations();
      console.log('Seeded geolocations');
    }

    if ((await this.nearestlocationService.getNearestlocation()).length === 0) {
      await this.nearestlocationService.seedNearestlocations();
      console.log('Seeded nearestlocations');
    }
    if ((await this.customerService.getCustomers()).length === 0) {
      await this.customerService.seedCustomers();
      console.log('Seeded customers');
    }
    if ((await this.accountServie.getAccounts()).length === 0) {
      await this.accountServie.seedAccounts();
      console.log('Seeded accounts');
    }

    if ((await this.subscriptionService.getSubscriptions()).length === 0) {
      await this.subscriptionService.seedSubscriptions();
      console.log('Seeded subscriptions');
    }

    if ((await this.contractService.getContracts()).length === 0) {
      await this.contractService.seedContracts();
      console.log('Seeded contracts');
    }
  }
}

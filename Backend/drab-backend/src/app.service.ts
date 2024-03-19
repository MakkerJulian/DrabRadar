import { Injectable } from '@nestjs/common';
import { CountryService } from './api/country/services/country/country.service';
import { WeatherstationService } from './api/weatherstation/services/weatherstation/weatherstation.service';
import { GeolocationService } from './api/geolocation/services/geolocation/geolocation.service';
import { NearestlocationService } from './api/nearestlocation/services/nearestlocation/nearestlocation.service';
import { CustomerService } from './api/customer/services/customer/customer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countryService: CountryService,
    private readonly weatherstationService: WeatherstationService,
    private readonly geolocationService: GeolocationService,
    private readonly nearestlocationService: NearestlocationService,
    private readonly customerService: CustomerService,
  ) {
    this.seedDatabase();
  }

  async seedDatabase() {
    if ((await this.countryService.getCountry()).length === 0) {
      console.log('Seeded countries');
      await this.countryService.seedCountries();
    }
    if ((await this.weatherstationService.getWeatherstations()).length === 0) {
      console.log('Seeded weatherstations');
      await this.weatherstationService.seedWeatherstations();
    }

    if ((await this.geolocationService.getGeolocation()).length === 0) {
      console.log('Seeded geolocations');
      await this.geolocationService.seedGeoLocations();
    }

    if ((await this.nearestlocationService.getNearestlocation()).length === 0) {
      console.log('Seeded nearestlocations');
      await this.nearestlocationService.seedNearestlocations();
    }
    if ((await this.customerService.getCustomers()).length === 0) {
      console.log('Seeded customers');
      await this.customerService.seedCustomers();
    }
  }
}

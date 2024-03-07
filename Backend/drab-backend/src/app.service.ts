import { Injectable } from '@nestjs/common';
import { CountryService } from './api/country/services/country/country.service';
import { WeatherstationService } from './api/weatherstation/services/weatherstation/weatherstation.service';
import { GeolocationService } from './api/geolocation/services/geolocation/geolocation.service';
import { NearestlocationService } from './api/nearestlocation/services/nearestlocation/nearestlocation.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countryService: CountryService,
    private readonly weatherstationService: WeatherstationService,
    private readonly geolocationService: GeolocationService,
    private readonly nearestlocationService: NearestlocationService,
  ) {
    this.seedDatabase();
  }

  async seedDatabase() {
    if (!(await this.countryService.getCountry())) {
      console.log('Seeding database');
      await this.countryService.seedCountries();
      await this.weatherstationService.seedWeatherstations();
      await this.geolocationService.seedGeoLocations();
      await this.nearestlocationService.seedNearestlocations();
    }
  }
}

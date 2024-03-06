import { Injectable } from '@nestjs/common';
import { CountryService } from './api/country/services/country/country.service';
import { WeatherstationService } from './api/weatherstation/services/weatherstation/weatherstation.service';
import { GeolocationService } from './api/geolocation/services/geolocation/geolocation.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countryService: CountryService,
    private readonly weatherstationService: WeatherstationService,
    private readonly geolocationService: GeolocationService,
  ) {
    this.seedDatabase();
  }

  async seedDatabase() {
    await this.countryService.seedCountries();
    await this.weatherstationService.seedWeatherstations();
    await this.geolocationService.seedGeoLocations();
  }
}

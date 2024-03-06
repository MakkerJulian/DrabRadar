import { Injectable } from '@nestjs/common';
import { CountryService } from './api/country/services/country/country.service';
import { GeolocationService } from './api/geolocation/services/geolocation/geolocation.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countryService: CountryService,
    private readonly geolocationService: GeolocationService,
  ) {
    this.seedDatabase();
  }

  async seedDatabase() {
    await this.countryService.seedCountries();
    await this.geolocationService.seedGeoLocations();
  }
}

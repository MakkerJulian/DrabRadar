import { Controller, Get } from '@nestjs/common';
import { CountryService } from '../../services/country/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountry() {
    return this.countryService.getCountry();
  }

  @Get('/seed')
  seedCountries() {
    return this.countryService.seedCountries();
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { CountryService } from '../../services/country/country.service';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @UseGuards(AuthGuard)
  @Get()
  getCountry() {
    return this.countryService.getCountry();
  }
}

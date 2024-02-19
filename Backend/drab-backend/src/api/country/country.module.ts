import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country/country.controller';
import { CountryService } from './services/country/country.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}

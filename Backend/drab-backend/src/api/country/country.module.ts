import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country/country.controller';
import { CountryService } from './services/country/country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/typeorm/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}

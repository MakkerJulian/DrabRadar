import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/typeorm/country.entity';
import { Repository } from 'typeorm';
import { countries } from 'src/seed';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  getCountry() {
    return this.countryRepository.find();
  }

  async seedCountries() {
    const newCountries = countries.map((country) => {
      return {
        code: country.country_code,
        name: country.country,
      };
    });
    await this.countryRepository.save(newCountries);
    return this.countryRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  geolocation,
  geolocation2,
  geolocation3,
  geolocation4,
} from 'src/seed';
import { Geolocation } from 'src/typeorm/geolocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geolocation)
    private readonly geolocationRepository: Repository<Geolocation>,
  ) {}

  async getGeolocation() {
    return this.geolocationRepository.find({
      relations: ['country', 'weatherstation'],
    });
  }

  async seedGeoLocations() {
    const totalgeolocation = [
      geolocation,
      geolocation2,
      geolocation3,
      geolocation4,
    ];
    totalgeolocation.forEach(async (geolocations) => {
      const newGeoLocations = geolocations.map((geolocation) => {
        return {
          id: geolocation.id,
          country: { code: geolocation.country_code },
          island: geolocation.island === '' ? null : geolocation.island,
          county: geolocation.county === '' ? null : geolocation.county,
          place: geolocation.place === '' ? null : geolocation.place,
          hamlet: geolocation.hamlet === '' ? null : geolocation.hamlet,
          town: geolocation.town === '' ? null : geolocation.town,
          municipality:
            geolocation.municipality === '' ? null : geolocation.municipality,
          state_district:
            geolocation.state_district === ''
              ? null
              : geolocation.state_district,
          administrative:
            geolocation.administrative === ''
              ? null
              : geolocation.administrative,
          state: geolocation.state === '' ? null : geolocation.state,
          village: geolocation.village === '' ? null : geolocation.village,
          region: geolocation.region === '' ? null : geolocation.region,
          province: geolocation.province === '' ? null : geolocation.province,
          city: geolocation.city === '' ? null : geolocation.city,
          locality: geolocation.locality === '' ? null : geolocation.locality,
          postcode: geolocation.postcode === '' ? null : geolocation.postcode,
          weatherstation: { name: geolocation.station_name },
        };
      });
      this.geolocationRepository.save(newGeoLocations);
    });
    return await this.geolocationRepository.find();
  }
}

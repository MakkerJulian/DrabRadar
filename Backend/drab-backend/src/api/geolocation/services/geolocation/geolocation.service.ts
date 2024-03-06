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
    await this.seedGeoLocations(geolocation);
    await this.seedGeoLocations(geolocation2);
    await this.seedGeoLocations(geolocation3);
    await this.seedGeoLocations(geolocation4);
    return this.geolocationRepository.find({ relations: ['country'] }); 
  }
  async seedGeoLocations(geolocations) {
    const newGeoLocations = geolocations.map((geolocation) => {
      return {
        name: geolocation.station_name,
        country: geolocation.country_code,
        island: geolocation.island === 'N/A' ? null : geolocation.island,
        county: geolocation.county === 'N/A' ? null : geolocation.county,
        place: geolocation.place === 'N/A' ? null : geolocation.place,
        hamlet: geolocation.hamlet === 'N/A' ? null : geolocation.hamlet,
        town: geolocation.town === 'N/A' ? null : geolocation.town,
        municipality:
          geolocation.municipality === 'N/A' ? null : geolocation.municipality,
        state_district:
          geolocation.state_district === 'N/A'
            ? null
            : geolocation.state_district,
        administrative:
          geolocation.administrative === 'N/A'
            ? null
            : geolocation.administrative,
        state: geolocation.state === 'N/A' ? null : geolocation.state,
        village: geolocation.village === 'N/A' ? null : geolocation.village,
        region: geolocation.region === 'N/A' ? null : geolocation.region,
        province: geolocation.province === 'N/A' ? null : geolocation.province,
        city: geolocation.city === 'N/A' ? null : geolocation.city,
        locality: geolocation.locality === 'N/A' ? null : geolocation.locality,
        postcode: geolocation.postcode === 'N/A' ? null : geolocation.postcode,
      };
    });
    await this.geolocationRepository.save(newGeoLocations);
    return this.geolocationRepository.find();
  }
}

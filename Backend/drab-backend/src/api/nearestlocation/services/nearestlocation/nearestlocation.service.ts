import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NearestLocation } from 'src/typeorm/nearestlocation.entity';
import { Repository } from 'typeorm';
import {
    nearestlocation,
    nearestlocation2,
  } from 'src/seed';

@Injectable()
export class NearestlocationService {
    constructor(
        @InjectRepository(NearestLocation)
        private readonly nearestlocationRepository: Repository<NearestLocation>,
    ) {}

    async getNearestlocation() {
        await this.seedNearestlocations(nearestlocation)
        await this.seedNearestlocations(nearestlocation2)
        return this.nearestlocationRepository.find({ relations: ['country', 'weatherstation']})
    }
    async seedNearestlocations(nearestlocations) {
        const newNearestlocations = nearestlocations.map((nearestlocation) => {
            return {
                station_name: nearestlocation.weatherstation,
                name: nearestlocation.name,
                administrative_region1 : nearestlocation.admin_region_name1,
                administrative_region2 : nearestlocation.admin_region_name2 === 'N/A' ? null : nearestlocation.admin_region_name2,
                country_code: nearestlocation.country,
                longitude: nearestlocation.longitude,
                latitude: nearestlocation.latitude,

            };
        });
        await this.nearestlocationRepository.save(newNearestlocations);
        return this.nearestlocationRepository.find();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NearestLocation } from 'src/typeorm/nearestlocation.entity';
import { Repository } from 'typeorm';
import { nearestlocation, nearestlocation2 } from 'src/seed';

@Injectable()
export class NearestlocationService {
  constructor(
    @InjectRepository(NearestLocation)
    private readonly nearestlocationRepository: Repository<NearestLocation>,
  ) {}

  async getNearestlocation() {
    await this.seedNearestlocations();
    return this.nearestlocationRepository.find({
      relations: ['country', 'weatherstation'],
    });
  }

  findNearestlocationByID(id: number) {
    return this.nearestlocationRepository.findOne({ where: { id: id } });
  }

  async seedNearestlocations() {
    const totalnearestlocation = [nearestlocation, nearestlocation2];

    totalnearestlocation.forEach(async (nearestlocations) => {
      const newNearestlocations = nearestlocations.map((nearestlocation) => {
        return {
          weatherstation: nearestlocation.station_name,
          name: nearestlocation.name,
          admin_region_name1: nearestlocation.administrative_region1,
          admin_region_name2:
            nearestlocation.administrative_region2 === 'N/A'
              ? null
              : nearestlocation.administrative_region2,
          country: nearestlocation.country_code,
          longitude: nearestlocation.longitude,
          latitude: nearestlocation.latitude,
        };
      });
      this.nearestlocationRepository.save(newNearestlocations);
    });
    return await this.nearestlocationRepository.find();
  }
}

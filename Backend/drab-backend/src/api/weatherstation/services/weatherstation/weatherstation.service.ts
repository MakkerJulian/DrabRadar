import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { station } from 'src/seed';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherstationService {
  constructor(
    @InjectRepository(Weatherstation)
    private readonly weatherstationRepository: Repository<Weatherstation>,
  ) {}

  async findById(id: number) {
    return this.weatherstationRepository.find({ where: { id: id } });
  }

  getWeatherstations() {
    return this.weatherstationRepository.find();
  }

  async seedWeatherstations() {
    const newWeatherstations = station.map((station) => {
      return {
        name: station.name,
        longitude: station.longitude,
        latitude: station.latitude,
        elevation: station.elevation,
      };
    });
    return this.weatherstationRepository.save(newWeatherstations);
  }
}

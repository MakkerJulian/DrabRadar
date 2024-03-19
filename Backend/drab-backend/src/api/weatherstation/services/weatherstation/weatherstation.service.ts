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

  async findByName(id: string) {
    return this.weatherstationRepository.find({ where: { name: id } });
  }

  async getWeatherstations() {
    const count = await this.weatherstationRepository.count();
    const offsets = Array.from({ length: 100 }, () => Math.floor(Math.random() * count));
    const promises = offsets.map(offset =>
      this.weatherstationRepository
        .createQueryBuilder()
        .orderBy('RANDOM()')
        .skip(offset)
        .take(1)
        .getOne()
    );

    return Promise.all(promises);
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

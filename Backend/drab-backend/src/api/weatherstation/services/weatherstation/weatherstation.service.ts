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
    return this.weatherstationRepository.findOne({
      where: { name: id },
      relations: ['geolocation', 'geolocation.country', 'weatherdatas'],
    });
  }

  getWeatherstations() {
    return this.weatherstationRepository.find({
      relations: ['geolocation', 'geolocation.country', 'weatherdatas'],
    });
  }

  getWeatherstationWithStorings() {
    return this.weatherstationRepository.find({
      relations: ['storings'],
      order: { storings: { timestamp: 'DESC' } },
    });
  }

  async getWeatherstationsDetails() {
    const allStations = await this.getWeatherstations();
    const count = allStations.length;
    const offsets = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * count),
    );
    const offsetslist = offsets.filter(
      (value, index) => offsets.indexOf(value) === index,
    );
    const randoms = offsetslist.map((index) => {
      return allStations[index];
    });
    const allStations1Data = randoms.map((station) => {
      return {
        ...station,
        weatherdatas: station.weatherdatas[0] || null,
      };
    });
    return allStations1Data;
  }

  seedWeatherstations() {
    const newWeatherstations = station.map((station) => {
      return {
        name: station.name,
        longitude: station.longitude,
        latitude: station.latitude,
        elevation: station.elevation,
      };
    });
    this.weatherstationRepository.save(newWeatherstations);
  }
}

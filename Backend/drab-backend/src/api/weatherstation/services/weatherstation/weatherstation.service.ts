import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordinates } from 'src/dto/coordinates';
import { station } from 'src/seed';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import { Repository, MoreThan } from 'typeorm';

@Injectable()
export class WeatherstationService {
  constructor(
    @InjectRepository(Weatherstation)
    private readonly weatherstationRepository: Repository<Weatherstation>,
  ) {}

  async findByName(id: string) {
    return this.weatherstationRepository.findOne({
      where: { name: id },
      relations: [
        'geolocation',
        'geolocation.country',
        'weatherdatas',
        'storings',
      ],
      order: { storings: { timestamp: 'DESC' } },
    });
  }

  getWeatherstations() {
    return this.weatherstationRepository.find({
      relations: [
        'geolocation',
        'geolocation.country',
        'weatherdatas',
        'storings',
      ],
    });
  }

  async getWeatherstationsByCountry(country: string) {
    const allStations = await this.getWeatherstations();
    return allStations.filter(
      (station) => station.geolocation.country.name === country,
    );
  }

  //check if the timestamp of storings is within the last day
  getWeatherstationWithStorings() {
    return this.weatherstationRepository.find({
      relations: ['storings'],
      where: {
        storings: {
          timestamp: MoreThan(new Date(Date.now() - 24 * 60 * 60 * 1000)),
        },
      },
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
      const lastIndex = station.weatherdatas.length - 1;
      return {
        ...station,
        weatherdatas: station.weatherdatas[lastIndex] || null,
      };
    });
    return allStations1Data;
  }

  async getWeatherstationsDetailsByCoords(coords: Coordinates) {
    const allStations = await this.getWeatherstations();
    const filteredStations = allStations.filter((station) => {
      const { latitude, longitude } = station;
      const { _southWest, _northEast } = coords;
      return (
        latitude >= _southWest.lat &&
        latitude <= _northEast.lat &&
        longitude >= _southWest.lng &&
        longitude <= _northEast.lng
      );
    });
    const allStations1Data = filteredStations.map((station) => {
      const lastIndex = station.weatherdatas.length - 1;
      return {
        ...station,
        weatherdatas: station.weatherdatas[lastIndex] || null,
      };
    });
    return allStations1Data;
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

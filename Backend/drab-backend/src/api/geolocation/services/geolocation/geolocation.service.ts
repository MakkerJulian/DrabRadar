import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geolocation } from 'src/typeorm/geolocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geolocation)
    private readonly GeolocationRepository: Repository<Geolocation>,
  ) {}

  getGeolocation() {
    return this.GeolocationRepository.find();
  }
}

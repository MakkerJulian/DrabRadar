import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import { Repository } from 'typeorm';


@Injectable()
export class WeatherstationService {
  constructor(
    @InjectRepository(Weatherstation)
    private readonly weatherstationRepository: Repository<Weatherstation>,
  ) {}

  findAccountByID(id: number) {
    return this.weatherstationRepository.findOne({ where: { id } });
  }

  getAccounts() {
    return this.weatherstationRepository.find();
  }

  deleteAll() {
    return this.weatherstationRepository.clear();
  }
}

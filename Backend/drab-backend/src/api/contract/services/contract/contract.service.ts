import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from 'src/typeorm/contract.entity';
import {
  CreateContractDto,
  CreateContractDtoByCountry,
} from 'src/dto/contract.dto';
import { WeatherstationService } from 'src/api/weatherstation/services/weatherstation/weatherstation.service';
import { Country } from 'src/typeorm/country.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly weatherstationService: WeatherstationService,
  ) { }

  createContract(createContractDto: CreateContractDto) {
    const weatherstations = createContractDto.weatherstations.map((station) => {
      return { name: station };
    });

    const newContract = {
      subscription: createContractDto.subscriptionId,
      level: createContractDto.level,
      weatherstations: weatherstations,
    };

    return this.contractRepository.save(newContract);
  }

  async createContractByCountry(
    createContractByCountry: CreateContractDtoByCountry,
  ) {

    const newContract = {
      subscription: createContractByCountry.subscriptionId,
      level: createContractByCountry.level,
      weatherstations: [],
      country: {code : createContractByCountry.country},
    };
    this.contractRepository.save(newContract);
    return this.contractRepository.find({relations: ["country"]});
  }

  async findContractByID(id: number) {
    const contract = await this.contractRepository.findOne({ where: { id: id }, relations:["country"] });
    console.log(contract)
    return contract;
  }

  async updateContractByWeatherstationId(id: number, name: string) {
    const contract = await this.contractRepository.findOne({
      where: { id: id },
      relations: ['weatherstations', 'country'],
    });
    const newWeatherstations = contract.weatherstations.filter(
      (station) => station.name !== name,
    );

    return this.contractRepository.save({
      ...contract,
      weatherstations: newWeatherstations,
    });
  }

  getContracts() {
    return this.contractRepository.find({
      relations: ['subscription', 'weatherstations', 'subscription.customer', 'country'],
    });
  }

  deleteAll() {
    return this.contractRepository.clear();
  }

  deleteContractById(id: number) {
    return this.contractRepository.delete(id);
  }

  async seedContracts() {
    this.createContract({
      subscriptionId: 1,
      level: 1,
      weatherstations: ['166870'],
    });
    this.createContract({
      subscriptionId: 1,
      level: 3,
      weatherstations: ['273550'],
    });
    this.createContract({
      subscriptionId: 1,
      level: 2,
      weatherstations: ['972400', '131680'],
    });
    return this.contractRepository.find();
  }

  updateLastCallDate(id: number) {
    return this.contractRepository.update(id, { lastCallDate: new Date() });
  }
}

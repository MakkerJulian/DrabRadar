import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from 'src/typeorm/contract.entity';
import { CreateContractDto } from 'src/dto/contract.dto';
import { WeatherstationService } from 'src/api/weatherstation/services/weatherstation/weatherstation.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly weatherstationService: WeatherstationService,
  ) {}

  async createContract(createContractDto: CreateContractDto) {
    let weatherstations = await this.weatherstationService.getWeatherstations();

    weatherstations = weatherstations.filter((station) =>
      createContractDto.weatherstations.includes(station.name),
    );

    const newContract = {
      subscription: createContractDto.subscriptionId,
      level: createContractDto.level,
      weatherstations: weatherstations,
    };

    return await this.contractRepository.save(newContract);
  }

  findContractByID(id: number) {
    return this.contractRepository.findOne({ where: { id } });
  }

  getContracts() {
    return this.contractRepository.find({
      relations: ['subscription', 'weatherstations', 'subscription.customer'],
    });
  }

  deleteAll() {
    return this.contractRepository.clear();
  }
}

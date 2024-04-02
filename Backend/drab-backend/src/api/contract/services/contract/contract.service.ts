import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from 'src/typeorm/contract.entity';
import { CreateContractDto } from 'src/dto/contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

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

  findContractByID(id: number) {
    return this.contractRepository.findOne({ where: { id: id } });
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

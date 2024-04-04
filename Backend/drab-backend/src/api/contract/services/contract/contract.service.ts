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

  async updateContractByWeatherstationId(id: number, name: string) {
    const contract = await this.contractRepository.findOne({
      where: { id: id, weatherstations: { name: name } },
      relations: ['weatherstations'],
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
      relations: ['subscription', 'weatherstations', 'subscription.customer'],
    });
  }

  deleteAll() {
    return this.contractRepository.clear();
  }

  deleteContractById(id: number) {
    return this.contractRepository.delete(id);
  }
}

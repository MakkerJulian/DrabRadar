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
    return this.contractRepository.save(createContractDto);
  }

  findContractByID(id: number) {
    return this.contractRepository.findOne({ where: { id } });
  }

  getContracts() {
    return this.contractRepository.find();
  }

  deleteAll() {
    return this.contractRepository.clear();
  }
}
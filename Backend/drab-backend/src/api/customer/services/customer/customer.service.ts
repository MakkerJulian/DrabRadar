import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/typeorm/customer.entity';
import { Repository } from 'typeorm';
import { customer } from 'src/seed';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomers() {
    return this.customerRepository.find({
      relations: [
        'subscription',
        'subscription.contracts',
        'subscription.contracts.weatherstations',
      ],
    });
  }

  async getCustomerById(id: number) {
    return this.customerRepository.findOne({
      where: { id: id },
      relations: [
        'subscription',
        'subscription.contracts',
        'subscription.contracts.weatherstations',
      ],
    });
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  seedCustomers() {
    return this.customerRepository.save(customer);
  }
}

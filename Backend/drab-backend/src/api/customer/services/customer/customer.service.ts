import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/typeorm/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  getCustomers() {
    return this.customerRepository.find({
      relations: [
        'subscriptions',
        'subscriptions.contracts',
        'subscriptions.contracts.weatherstations',
      ],
    });
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }
}

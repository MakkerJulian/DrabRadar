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
  async seedCustomers() {
    const newCustomers = customer.map((customer) => {
      return {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      };
    });
    return this.customerRepository.save(newCustomers);
  }
}

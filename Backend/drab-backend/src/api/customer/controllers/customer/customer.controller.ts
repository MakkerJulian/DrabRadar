import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CreateCustomerDto } from 'src/dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomer() {
    return this.customerService.getCustomers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    return this.customerService.createCustomer(createCustomerDto);
  }
}

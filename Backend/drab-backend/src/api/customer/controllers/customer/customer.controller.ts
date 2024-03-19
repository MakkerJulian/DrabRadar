import {
  Body,
  Controller,
  Get,
  Param,
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

  @Get(':id')
  getCustomerById(@Param('id') id: number) {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    return this.customerService.createCustomer(createCustomerDto);
  }
}

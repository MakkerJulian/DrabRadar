import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CreateCustomerDto } from 'src/dto/customer.dto';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
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
    return this.customerService.createCustomer(createCustomerDto);
  }
}

import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  exports: [CustomerService],
  providers: [CustomerService],
})
export class CustomerModule {}

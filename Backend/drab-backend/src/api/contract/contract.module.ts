import { Module } from '@nestjs/common';
import { ContractController } from './controllers/contract/contract.controller';
import { ContractService } from './services/contract/contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from 'src/typeorm/contract.entity';
import { WeatherstationModule } from '../weatherstation/weatherstation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), WeatherstationModule],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}

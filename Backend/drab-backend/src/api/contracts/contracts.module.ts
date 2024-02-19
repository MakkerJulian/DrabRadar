import { Module } from '@nestjs/common';
import { ContractsController } from './controllers/contracts/contracts.controller';
import { ContractsService } from './services/contracts/contracts.service';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}

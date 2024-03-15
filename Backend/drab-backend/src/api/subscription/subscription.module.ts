import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription/subscription.controller';
import { SubscriptionService } from './services/subscription/subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/typeorm/subscription.entity';
import { ContractModule } from '../contract/contract.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), ContractModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}

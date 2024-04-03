import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription/subscription.controller';
import { SubscriptionService } from './services/subscription/subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/typeorm/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}

import { Module } from '@nestjs/common';
import { ExternController } from './controllers/extern/extern.controller';
import { ExternService } from './services/extern/extern.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import { SubscriptionModule } from '../subscription/subscription.module';
import { SubscriptionService } from '../subscription/services/subscription/subscription.service'

@Module({
  imports: [
    SubscriptionModule,
    TypeOrmModule.forFeature([Weatherstation]), 
  ],
  exports: [ExternService],
  controllers: [ExternController],
  providers: [ExternService, SubscriptionService], 
})
export class ExternModule {}
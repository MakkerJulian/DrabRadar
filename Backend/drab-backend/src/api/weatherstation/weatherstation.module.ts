import { Module } from '@nestjs/common';
import { WeatherstationController } from './controllers/weatherstation/weatherstation.controller';
import { WeatherstationService } from './services/weatherstation/weatherstation.service';

@Module({
  controllers: [WeatherstationController],
  providers: [WeatherstationService]
})
export class WeatherstationModule {}

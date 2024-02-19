import { Module } from '@nestjs/common';
import { CityController } from './controllers/city/city.controller';
import { CityService } from './services/city/city.service';

@Module({
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}

import { Module } from '@nestjs/common';
import { NearestlocationController } from './controllers/nearestlocation/nearestlocation.controller';
import { NearestlocationService } from './services/nearestlocation/nearestlocation.service';

@Module({
  controllers: [NearestlocationController],
  providers: [NearestlocationService]
})
export class NearestlocationModule {}

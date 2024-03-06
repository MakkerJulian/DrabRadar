import { Module } from '@nestjs/common';
import { NearestlocationController } from './controllers/nearestlocation/nearestlocation.controller';
import { NearestlocationService } from './services/nearestlocation/nearestlocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NearestLocation } from 'src/typeorm/nearestlocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NearestLocation])],
  controllers: [NearestlocationController],
  providers: [NearestlocationService]
})
export class NearestlocationModule {}

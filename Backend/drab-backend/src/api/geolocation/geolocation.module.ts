import { Module } from '@nestjs/common';
import { GeolocationController } from './controllers/geolocation/geolocation.controller';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from 'src/typeorm/geolocation.entity';
import { WeatherstationModule } from '../weatherstation/weatherstation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Geolocation]), WeatherstationModule],
  controllers: [GeolocationController],
  providers: [GeolocationService],
  exports: [GeolocationService],
})
export class GeolocationModule {}

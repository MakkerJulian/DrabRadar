import { Module } from '@nestjs/common';
import { GeolocationController } from './controllers/geolocation/geolocation.controller';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from 'src/typeorm/geolocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geolocation])],
  controllers: [GeolocationController],
  providers: [GeolocationService]
})
export class GeolocationModule {}

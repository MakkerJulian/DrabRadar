import { Controller, Get } from '@nestjs/common';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  getGeolocation() {
    return this.geolocationService.getGeolocation();
  }
}

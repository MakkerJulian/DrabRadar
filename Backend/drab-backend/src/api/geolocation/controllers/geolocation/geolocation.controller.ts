import { Controller, Get, UseGuards } from '@nestjs/common';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @UseGuards(AuthGuard)
  @Get()
  getGeolocation() {
    return this.geolocationService.getGeolocation();
  }
}

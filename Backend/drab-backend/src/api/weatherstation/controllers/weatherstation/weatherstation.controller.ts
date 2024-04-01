import { Controller, Get, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';

@Controller('weatherstation')
export class WeatherstationController {
  constructor(private readonly weatherstationService: WeatherstationService) {}

  @Get()
  getAccount() {
    return this.weatherstationService.getWeatherstations();
  }

  @Get('details')
  getGeolocationDetails() {
    return this.weatherstationService.getWeatherstationsDetails();
  }

  @Get('id/:id')
  findAccountById(@Param('id', ParseIntPipe) id: string) {
    return this.weatherstationService.findByName(id);
  }
  @Get('/extern')
  getExtern(@Headers('latitude') latitude: number, @Headers('longitude') longitude: number, @Headers('elevation') elevation: number, @Headers('token') token:string) {
    return this.weatherstationService.getExtern(token, latitude, longitude, elevation);
  }
}

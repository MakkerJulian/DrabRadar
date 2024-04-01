import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';

@Controller('weatherstation')
export class WeatherstationController {
  constructor(private readonly weatherstationService: WeatherstationService) {}

  @Get()
  getWeatherStations() {
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
}

import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('weatherstation')
export class WeatherstationController {
  constructor(private readonly weatherstationService: WeatherstationService) {}

  @UseGuards(AuthGuard)
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

  @Get('storings')
  getWeatherstationWithStorings() {
    return this.weatherstationService.getWeatherstationWithStorings();
  }
}

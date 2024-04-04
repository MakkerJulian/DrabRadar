import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';
import { AuthGuard } from 'src/api/auth/Authguard';
import { Coordinates } from 'src/dto/coordinates';

@Controller('weatherstation')
export class WeatherstationController {
  constructor(private readonly weatherstationService: WeatherstationService) {}

  @UseGuards(AuthGuard)
  @Get()
  getWeatherstations() {
    return this.weatherstationService.getWeatherstations();
  }

  @Get('details')
  getGeolocationDetails() {
    return this.weatherstationService.getWeatherstationsDetails();
  }

  @Post('details')
  getGeolocationDetailsPost(@Body() coordinates: Coordinates) {
    if (
      Math.abs(coordinates._southWest.lat - coordinates._northEast.lat) < 11
    ) {
      return this.weatherstationService.getWeatherstationsDetailsByCoords(
        coordinates,
      );
    } else {
      return this.weatherstationService.getWeatherstationsDetails();
    }
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

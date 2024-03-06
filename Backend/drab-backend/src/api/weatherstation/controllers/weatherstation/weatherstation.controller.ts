import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';

@Controller('weatherstation')
export class WeatherstationController {
  constructor(private readonly weatherstationService: WeatherstationService) {}

  @Get()
  getAccount() {
    return this.weatherstationService.getWeatherstations();
  }

  @Get('id/:id')
  findAccountById(@Param('id', ParseIntPipe) id: string) {
    return this.weatherstationService.findByName(id);
  }
}

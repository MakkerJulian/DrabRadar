import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { WeatherstationService } from '../../services/weatherstation/weatherstation.service';
  
  @Controller('account')
  export class WeatherstationController {
    constructor(private readonly weatherstationService: WeatherstationService) {}
  
    @Get()
    getAccount() {
      return this.weatherstationService.getAccounts();
    }
  
    @Get('id/:id')
    findAccountById(@Param('id', ParseIntPipe) id: number) {
      return this.weatherstationService.findAccountByID(id);
    }
  }
  
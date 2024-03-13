import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WeatherdataService } from '../../services/weatherdata/weatherdata.service';
import { CreateWeatherdataDto } from 'src/dto/weatherdata.dto';

@Controller('weatherdata')
export class WeatherdataController {
  constructor(private readonly weatherdataService: WeatherdataService) {}

  @Get()
  getWeatherstationdata() {
    return this.weatherdataService.getWeatherdata();
  }

  @Get('id/:id')
  findWeatherstationdataById(@Param('id', ParseIntPipe) id: number) {
    return this.weatherdataService.findWeatherdataByID(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createWeatherdata(
    @Body()
    createWeatherdataDto: {
      WEATHERDATA: CreateWeatherdataDto[];
    },
  ) {
    if (!createWeatherdataDto.WEATHERDATA) return [];
    this.weatherdataService.createWeatherdata(createWeatherdataDto);
  }

  @Delete()
  deleteWeatherdata() {
    return this.weatherdataService.deleteAll();
  }
}

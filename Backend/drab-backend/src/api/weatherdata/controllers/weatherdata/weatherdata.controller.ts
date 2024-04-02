import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WeatherdataService } from '../../services/weatherdata/weatherdata.service';
import { CreateWeatherdataDto } from 'src/dto/weatherdata.dto';
import { AuthGuard } from 'src/api/auth/Authguard';
import { Public } from 'src/api/auth/metaData';

@Controller('weatherdata')
export class WeatherdataController {
  constructor(private readonly weatherdataService: WeatherdataService) {}

  @UseGuards(AuthGuard)
  @Get()
  getWeatherstationdata() {
    return this.weatherdataService.getWeatherdata();
  }

  @Get('id/:id')
  findWeatherstationdataById(@Param('id', ParseIntPipe) id: number) {
    return this.weatherdataService.findWeatherdataByID(id);
  }

  @Public()
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

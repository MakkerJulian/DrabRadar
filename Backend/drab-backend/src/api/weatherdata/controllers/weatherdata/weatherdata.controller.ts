import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
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
  @UsePipes(ValidationPipe)
  createWeatherdata(
    @Body()
    createWeatherdataDto: {
      WEATHERDATA: CreateWeatherdataDto[];
    },
  ) {
    console.log(createWeatherdataDto)
    return this.weatherdataService.createWeatherdata(
      createWeatherdataDto,
    );
  }

  @Delete()
  deleteWeatherdata() {
    return this.weatherdataService.deleteAll();
  }
}

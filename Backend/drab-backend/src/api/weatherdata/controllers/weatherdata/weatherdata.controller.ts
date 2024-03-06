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
  import { WeatherstationdataService} from '../../services/weatherdata/weatherdata.service';
  import { CreateWeatherstationdataDto } from 'src/dto/weatherstationdata.dto';
  
  @Controller('weatherdata')
  export class WeatherdataController {
    constructor(private readonly weatherdataService: WeatherstationdataService) {}
  
    @Get()
    getWeatherstationdata() {
      return this.weatherdataService.getWeatherstationdata();
    }
  
    @Get('id/:id')
    findWeatherstationdataById(@Param('id', ParseIntPipe) id: number) {
      return this.weatherdataService.findWeatherstationdataByID(id);
    }
  
    @Post()
    @UsePipes(ValidationPipe)
    createWeatherstationdata(@Body() createWeatherstationdataDto: CreateWeatherstationdataDto[]) {
      return this.weatherdataService.createWeatherstationdata(createWeatherstationdataDto);
    }
  
    @Delete()
    deleteWeatherstationdata() {
      return this.weatherdataService.deleteAll();
    }
  }
import { Controller, Get, ParseIntPipe, Param } from '@nestjs/common';
import { NearestlocationService } from '../../services/nearestlocation/nearestlocation.service';

@Controller('nearestlocation')
export class NearestlocationController {
    constructor(private readonly nearestlocationService: NearestlocationService) {}

    @Get()
    getNearestlocation() {
        return this.nearestlocationService.getNearestlocation();
    }

    @Get('id/:id')
    findNearestlocationById(@Param('id', ParseIntPipe) id: number) {
        return this.nearestlocationService.findNearestlocationByID(id);
  }
}

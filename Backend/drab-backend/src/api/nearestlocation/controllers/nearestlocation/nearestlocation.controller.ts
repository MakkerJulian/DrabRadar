import { Controller, Get } from '@nestjs/common';
import { NearestlocationService } from '../../services/nearestlocation/nearestlocation.service';

@Controller('nearestlocation')
export class NearestlocationController {
    constructor(private readonly nearestlocationService: NearestlocationService) {}

    @Get()
    getNearestlocation() {
        return this.nearestlocationService.getNearestlocation();
  }
}

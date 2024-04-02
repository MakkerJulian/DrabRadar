import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NearestlocationService } from '../../services/nearestlocation/nearestlocation.service';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('nearestlocation')
export class NearestlocationController {
  constructor(
    private readonly nearestlocationService: NearestlocationService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getNearestlocation() {
    return this.nearestlocationService.getNearestlocation();
  }

  @Get('id/:id')
  findNearestlocationById(@Param('id', ParseIntPipe) id: number) {
    return this.nearestlocationService.findNearestlocationByID(id);
  }
}

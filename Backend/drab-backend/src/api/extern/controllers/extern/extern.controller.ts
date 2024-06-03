import { Controller, Get, Query } from '@nestjs/common';
import { ExternService } from '../../services/extern/extern.service';
import { Public } from 'src/api/auth/metaData';

@Controller('extern')
export class ExternController {
  constructor(private readonly externService: ExternService) {}

  @Public()
  @Get()
  getByToken(
    @Query('token') token,
    @Query('latitude') latitude,
    @Query('longitude') longitude,
    @Query('elevation') elevation,
    @Query('country') country,
  ) {
    return this.externService.get(
      token,
      latitude,
      longitude,
      elevation,
      country,
    );
  }
}

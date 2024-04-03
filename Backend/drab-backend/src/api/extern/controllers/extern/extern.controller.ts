import { Controller, Get, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { ExternService } from '../../services/extern/extern.service';
import { Public } from 'src/api/auth/metaData';

@Controller('IWA')
export class ExternController {
  constructor(private readonly externService: ExternService) {}

  @Public()
  @Get()
  get(
    @Headers('latitude') latitude: number,
    @Headers('longitude') longitude: number,
    @Headers('elevation') elevation: number,
    @Headers('token') token: string,
  ) {
    return this.externService.get(token, latitude, longitude, elevation);
  }
}

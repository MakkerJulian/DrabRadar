import { Module } from '@nestjs/common';
import { WeatherdataController } from './controllers/weatherdata/weatherdata.controller';
import { WeatherdataService } from './services/weatherdata/weatherdata.service';

@Module({
  controllers: [WeatherdataController],
  providers: [WeatherdataService]
})
export class WeatherdataModule {}

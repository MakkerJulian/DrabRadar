import { Module } from '@nestjs/common';
import { WeatherdataController } from './controllers/weatherdata/weatherdata.controller';
import { WeatherdataService } from './services/weatherdata/weatherdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherData } from 'src/typeorm/weatherdata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherData])],
  controllers: [WeatherdataController],
  providers: [WeatherdataService]
})
export class WeatherdataModule {}

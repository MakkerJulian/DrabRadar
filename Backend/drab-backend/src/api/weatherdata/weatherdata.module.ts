import { Module } from '@nestjs/common';
import { WeatherdataController } from './controllers/weatherdata/weatherdata.controller';
import { WeatherdataService } from './services/weatherdata/weatherdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { Storing } from 'src/typeorm/storing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeatherData]),
    TypeOrmModule.forFeature([Storing]),
  ],
  controllers: [WeatherdataController],
  providers: [WeatherdataService],
  exports: [WeatherdataService],
})
export class WeatherdataModule {}

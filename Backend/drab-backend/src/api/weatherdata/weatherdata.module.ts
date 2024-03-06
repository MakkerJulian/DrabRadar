import { Module } from '@nestjs/common';
import { WeatherdataController } from './controllers/weatherdata/weatherdata.controller';
import { WeatherstationdataService } from './services/weatherdata/weatherdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherstationData } from 'src/typeorm/weatherstationdata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherstationData])],
  controllers: [WeatherdataController],
  providers: [WeatherstationdataService]
})
export class WeatherdataModule {}

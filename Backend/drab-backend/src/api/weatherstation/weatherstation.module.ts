import { Module } from '@nestjs/common';
import { WeatherstationController } from './controllers/weatherstation/weatherstation.controller';
import { WeatherstationService } from './services/weatherstation/weatherstation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weatherstation])],
  exports: [WeatherstationService],
  controllers: [WeatherstationController],
  providers: [WeatherstationService],
})
export class WeatherstationModule {}

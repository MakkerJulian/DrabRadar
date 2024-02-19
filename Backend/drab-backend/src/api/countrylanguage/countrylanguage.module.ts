import { Module } from '@nestjs/common';
import { CountrylanguageController } from './controllers/countrylanguage/countrylanguage.controller';
import { CountrylanguageService } from './services/countrylanguage/countrylanguage.service';

@Module({
  controllers: [CountrylanguageController],
  providers: [CountrylanguageService]
})
export class CountrylanguageModule {}

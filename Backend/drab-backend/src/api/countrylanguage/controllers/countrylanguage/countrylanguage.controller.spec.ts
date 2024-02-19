import { Test, TestingModule } from '@nestjs/testing';
import { CountrylanguageController } from './countrylanguage.controller';

describe('CountrylanguageController', () => {
  let controller: CountrylanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountrylanguageController],
    }).compile();

    controller = module.get<CountrylanguageController>(CountrylanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

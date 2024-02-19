import { Test, TestingModule } from '@nestjs/testing';
import { CountrylanguageService } from './countrylanguage.service';

describe('CountrylanguageService', () => {
  let service: CountrylanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountrylanguageService],
    }).compile();

    service = module.get<CountrylanguageService>(CountrylanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

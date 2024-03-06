import { Test, TestingModule } from '@nestjs/testing';
import { WeatherdataService } from './weatherdata.service';

describe('WeatherdataService', () => {
  let service: WeatherdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherdataService],
    }).compile();

    service = module.get<WeatherdataService>(WeatherdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WeatherstationService } from './weatherstation.service';

describe('WeatherstationService', () => {
  let service: WeatherstationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherstationService],
    }).compile();

    service = module.get<WeatherstationService>(WeatherstationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

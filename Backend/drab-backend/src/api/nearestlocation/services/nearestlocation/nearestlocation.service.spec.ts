import { Test, TestingModule } from '@nestjs/testing';
import { NearestlocationService } from './nearestlocation.service';

describe('NearestlocationService', () => {
  let service: NearestlocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearestlocationService],
    }).compile();

    service = module.get<NearestlocationService>(NearestlocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

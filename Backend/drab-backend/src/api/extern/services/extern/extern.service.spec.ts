import { Test, TestingModule } from '@nestjs/testing';
import { ExternService } from './extern.service';

describe('ExternService', () => {
  let service: ExternService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternService],
    }).compile();

    service = module.get<ExternService>(ExternService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ExternController } from './extern.controller';

describe('ExternController', () => {
  let controller: ExternController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternController],
    }).compile();

    controller = module.get<ExternController>(ExternController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

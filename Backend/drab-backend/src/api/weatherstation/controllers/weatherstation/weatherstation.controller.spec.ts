import { Test, TestingModule } from '@nestjs/testing';
import { WeatherstationController } from './weatherstation.controller';

describe('WeatherstationController', () => {
  let controller: WeatherstationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherstationController],
    }).compile();

    controller = module.get<WeatherstationController>(WeatherstationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

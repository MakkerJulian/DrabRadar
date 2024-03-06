import { Test, TestingModule } from '@nestjs/testing';
import { WeatherdataController } from './weatherdata.controller';

describe('WeatherdataController', () => {
  let controller: WeatherdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherdataController],
    }).compile();

    controller = module.get<WeatherdataController>(WeatherdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

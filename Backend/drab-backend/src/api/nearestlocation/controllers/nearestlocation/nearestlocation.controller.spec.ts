import { Test, TestingModule } from '@nestjs/testing';
import { NearestlocationController } from './nearestlocation.controller';

describe('NearestlocationController', () => {
  let controller: NearestlocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearestlocationController],
    }).compile();

    controller = module.get<NearestlocationController>(NearestlocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

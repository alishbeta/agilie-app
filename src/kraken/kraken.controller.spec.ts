import { Test, TestingModule } from '@nestjs/testing';
import { KrakenController } from './kraken.controller';

describe('KrakenController', () => {
  let controller: KrakenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KrakenController],
    }).compile();

    controller = module.get<KrakenController>(KrakenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

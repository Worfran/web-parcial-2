import { Test, TestingModule } from '@nestjs/testing';
import { ResennaController } from './resenna.controller';
import { ResennaService } from './resenna.service';

describe('ResennaController', () => {
  let controller: ResennaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResennaController],
      providers: [ResennaService],
    }).compile();

    controller = module.get<ResennaController>(ResennaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

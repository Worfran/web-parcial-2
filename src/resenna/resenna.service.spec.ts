import { Test, TestingModule } from '@nestjs/testing';
import { ResennaService } from './resenna.service';

describe('ResennaService', () => {
  let service: ResennaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResennaService],
    }).compile();

    service = module.get<ResennaService>(ResennaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

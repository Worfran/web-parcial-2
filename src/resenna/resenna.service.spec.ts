import { Test, TestingModule } from '@nestjs/testing';
import { ResennaService } from './resenna.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';

describe('ResennaService', () => {
  let service: ResennaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ResennaService],
    }).compile();

    service = module.get<ResennaService>(ResennaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

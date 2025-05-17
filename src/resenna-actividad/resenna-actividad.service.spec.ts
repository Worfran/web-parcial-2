import { Test, TestingModule } from '@nestjs/testing';
import { ResennaActividadService } from './resenna-actividad.service';

describe('ResennaActividadService', () => {
  let service: ResennaActividadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResennaActividadService],
    }).compile();

    service = module.get<ResennaActividadService>(ResennaActividadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

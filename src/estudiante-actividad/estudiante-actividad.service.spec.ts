import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';

describe('EstudianteActividadService', () => {
  let service: EstudianteActividadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteActividadService],
    }).compile();

    service = module.get<EstudianteActividadService>(EstudianteActividadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

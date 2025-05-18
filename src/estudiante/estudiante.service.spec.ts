import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await repository.clear();
  });

  it('Deberia crear un estudiante', async () => {
    const dto = {
      cedula: 123456,
      nombre: 'Antonio Orquidea',
      correo: 'orquidea@example.com',
      programa: 'Ingenieria',
      semestre: 5
    };
    const estudiante = await service.crearEstudiante(dto);
    expect(estudiante).toBeDefined();
    expect(estudiante.correo).toBe(dto.correo);
  });

  it('Deberia fallar. Formato de correo no valido', async () => {
    const dto = {
      cedula: 123456,
      nombre: 'Antonio Orquidea',
      correo: 'antoniomail.com', 
      programa: 'Ingenieria',
      semestre: 5
    };
    await expect(service.crearEstudiante(dto)).rejects.toHaveProperty(
      'message',
      'El correo electronico no tiene un formato valido.'
    );
  });

  it('Deberia retornar un estudiante', async () => {
    const estudiante = await repository.save({
      cedula: 654321,
      nombre: 'Maria Lopez',
      correo: 'maria@example.com',
      programa: 'Matematicas',
      semestre: 3
    });
    const found = await service.findEstudianteById(estudiante.id);
    expect(found).toBeDefined();
    expect(found.id).toBe(estudiante.id);
  });

  it('Deberia fallar. Estudiante no encontrado', async () => {
    await expect(service.findEstudianteById('no-existe-id')).rejects.toHaveProperty(
      'message',
      'Estudiante no encontrado.'
    );
  });
});
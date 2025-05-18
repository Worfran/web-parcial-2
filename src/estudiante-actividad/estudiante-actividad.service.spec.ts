import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';
import { faker } from '@faker-js/faker';

describe('EstudianteActividadService', () => {
  let service: EstudianteActividadService;
  let estudianteRepository: Repository<EstudianteEntity>;
  let actividadRepository: Repository<ActividadEntitty>;
  let estudiante: EstudianteEntity;
  let actividad: ActividadEntitty;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteActividadService],
    }).compile();

    service = module.get<EstudianteActividadService>(EstudianteActividadService);
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    actividadRepository = module.get<Repository<ActividadEntitty>>(getRepositoryToken(ActividadEntitty));

    await estudianteRepository.clear();
    await actividadRepository.clear();

    actividad = await actividadRepository.save({
      titulo: faker.lorem.words(3),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 20,
      estado: 0,
      estudiantes: [],
      resennas: []
    });

    estudiante = await estudianteRepository.save({
      cedula: faker.number.int(),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: 3,
      actividades: [],
      resennas: []
    });
  });

  it('Deberia inscribir al estudiante', async () => {
    const result = await service.inscribirseActividad(estudiante.id, actividad.id);
    expect(result.actividades.map(a => a.id)).toContain(actividad.id);
  });

  it('Deberia fallar. Actvidad no existe', async () => {
    await expect(service.inscribirseActividad(estudiante.id, 'non-existent-id'))
      .rejects.toHaveProperty('message', 'Actividad no encontrada.');
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { ActividadEntitty } from './entities/actividad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateActividadDto } from './dto/create-actividad.dto';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntitty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntitty>>(getRepositoryToken(ActividadEntitty));
    await repository.clear();
  });

  it('Deberia crear la actividad', async () => {
    const dto: CreateActividadDto = {
      titulo: faker.lorem.sentence(5),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 50,
      estado: 0
    };

    const actividad = await service.crearAvtividad(dto);

    expect(actividad).toBeDefined();
    expect(actividad.titulo).toBe(dto.titulo);
    expect(actividad.estado).toBe(0);
  });

  it('Deberia fallar. Las actvidades deben ser creadas con estado inicial 0', async () => {
    const dto: CreateActividadDto = {
      titulo: faker.lorem.sentence(5),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 50,
      estado: 1 
    };

    await expect(service.crearAvtividad(dto)).rejects.toHaveProperty(
      'message',
      'Las actividades deben ser creadas con estado abierto.'
    );
  });

  it('Deberia actualizar el estado.', async () => {
    const actividad = await repository.save({
      titulo: faker.lorem.sentence(5),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 0,
      estado: 0,
      estudiantes: [],
      resennas: []
    });

    const dto: CreateActividadDto = {
      titulo: actividad.titulo,
      fecha: actividad.fecha,
      cupoMaximo: actividad.cupoMaximo,
      estado: 2 
    };

    const updated = await service.cambiarEstado(actividad.id, dto);
    expect(updated.estado).toBe(dto.estado);
  });

  it('Deberia fallar. La actividad no existe.', async () => {
    const dto: CreateActividadDto = {
      titulo: faker.lorem.sentence(5),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 10,
      estado: 1
    };

    await expect(service.cambiarEstado('no-existe-id', dto)).rejects.toHaveProperty(
      'message',
      'No se encontro la actividad'
    );
  });

  it('Deberia retornar la actvidades con la fecha dada', async () => {
    const date = faker.date.future().toISOString().split('T')[0];

    await repository.save({
      titulo: faker.lorem.sentence(5),
      fecha: date,
      cupoMaximo: 10,
      estado: 0,
      estudiantes: [],
      resennas: []
    });
    await repository.save({
      titulo: faker.lorem.sentence(5),
      fecha: date,
      cupoMaximo: 15,
      estado: 0,
      estudiantes: [],
      resennas: []
    });

    const actividades = await service.findAllActividadesByDate(date);
    expect(Array.isArray(actividades)).toBe(true);
    expect(actividades.length).toBeGreaterThanOrEqual(2);
    actividades.forEach(a => expect(a.fecha).toContain(date));
  });
});
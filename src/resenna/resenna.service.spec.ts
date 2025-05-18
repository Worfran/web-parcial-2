import { Test, TestingModule } from '@nestjs/testing';
import { ResennaService } from './resenna.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResennaEntity } from './entities/resenna.entity';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';
import { faker } from '@faker-js/faker';
import { BussinessLogicException } from '../shared/errors/business-errors';

describe('ResennaService', () => {
  let service: ResennaService;
  let resennaRepository: Repository<ResennaEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;
  let actividadRepository: Repository<ActividadEntitty>;
  let estudiante: EstudianteEntity;
  let actividad: ActividadEntitty;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ResennaService],
    }).compile();

    service = module.get<ResennaService>(ResennaService);
    resennaRepository = module.get<Repository<ResennaEntity>>(getRepositoryToken(ResennaEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    actividadRepository = module.get<Repository<ActividadEntitty>>(getRepositoryToken(ActividadEntitty));

    await resennaRepository.clear();
    await estudianteRepository.clear();
    await actividadRepository.clear();

    actividad = await actividadRepository.save({
      titulo: faker.lorem.words(3),
      fecha: faker.date.future().toISOString(),
      cupoMaximo: 30,
      estado: 2, 
      estudiantes: [],
      resennas: []
    });

    estudiante = await estudianteRepository.save({
      cedula: faker.number.int(),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: 5,
      actividades: [],
      resennas: []
    });

    await estudianteRepository
      .createQueryBuilder()
      .relation(EstudianteEntity, "actividades")
      .of(estudiante)
      .add(actividad);


    estudiante = (await estudianteRepository.findOne({
      where: { id: estudiante.id },
      relations: ["actividades"],
    }))!;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear una nueva reseña', async () => {
    const dto = {
      comentario: faker.lorem.sentence(),
      calificacion: 5,
      fecha: faker.date.recent().toISOString(),
      estudianteId: estudiante.id,
      actividadId: actividad.id
    };

    const resenna = await service.agregarResenna(dto);

    expect(resenna).toBeDefined();
    expect(resenna.comentario).toBe(dto.comentario);
    expect(resenna.calificacion).toBe(dto.calificacion);
  });

  it('Deberia arrogar error. Estudiante no encontrado,', async () => {
    const dto = {
      comentario: faker.lorem.sentence(),
      calificacion: 4,
      fecha: faker.date.recent().toISOString(),
      estudianteId: 'non-existent-id',
      actividadId: actividad.id
    };

    await expect(service.agregarResenna(dto)).rejects.toHaveProperty("message", "Estudiante no encontrado.");
  });

});
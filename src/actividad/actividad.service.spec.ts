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
  let actividadList: ActividadEntitty[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntitty>>(getRepositoryToken(ActividadEntitty));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    actividadList = [];
    for (let i = 0; i < 5; i++) {
      const actividad: ActividadEntitty = await repository.save({
        titulo: faker.lorem.sentence(),
        estado: 0,
        cupoMaximo: faker.number.int({ min: 1, max: 10 }),
        fecha: faker.date.recent().toISOString(),
        estudiantes: [],
        resennas: []
      });
      actividadList.push(actividad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});

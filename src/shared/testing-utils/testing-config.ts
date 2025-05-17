import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntitty } from '../../actividad/entities/actividad.entity';
import { EstudianteEntity } from '../../estudiante/entities/estudiante.entity';
import { ResennaEntity } from '../../resenna/entities/resenna.entity';


export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      ActividadEntitty,
      EstudianteEntity,
      ResennaEntity
    ],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([
    ActividadEntitty,
    EstudianteEntity,
    ResennaEntity
  ]),
];

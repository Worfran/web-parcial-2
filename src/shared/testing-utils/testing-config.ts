import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntitty } from 'src/actividad/entities/actividad.entity';
import { EstudianteEntity } from 'src/estudiante/entities/estudiante.entity';
import { ResennaEntity } from 'src/resenna/entities/resenna.entity';


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

  ]),
];

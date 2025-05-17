import { Module } from '@nestjs/common';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { EstudianteActividadController } from './estudiante-actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([EstudianteEntity, ActividadEntitty])],
  providers: [EstudianteActividadService],
  controllers: [EstudianteActividadController]
})
export class EstudianteActividadModule {}

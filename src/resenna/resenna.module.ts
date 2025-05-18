import { Module } from '@nestjs/common';
import { ResennaService } from './resenna.service';
import { ResennaController } from './resenna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResennaEntity } from './entities/resenna.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResennaEntity, ActividadEntitty, EstudianteEntity])],
  controllers: [ResennaController],
  providers: [ResennaService],
})
export class ResennaModule {}

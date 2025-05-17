import { Module } from '@nestjs/common';
import { ResennaActividadService } from './resenna-actividad.service';
import { ResennaActividadController } from './resenna-actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResennaEntity } from '../resenna/entities/resenna.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ResennaEntity, ActividadEntitty])],
  providers: [ResennaActividadService],
  controllers: [ResennaActividadController]
})
export class ResennaActividadModule {}

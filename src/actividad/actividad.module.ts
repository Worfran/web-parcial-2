import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntitty } from './entities/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEntitty])], 
  controllers: [ActividadController],
  providers: [ActividadService],
})
export class ActividadModule {}

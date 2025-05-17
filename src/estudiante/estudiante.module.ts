import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}

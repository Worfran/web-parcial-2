import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { EstudianteEntity } from './entities/estudiante.entity';


@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  crearEstudiante(@Body() createEstudianteDto: CreateEstudianteDto): Promise<EstudianteEntity> {
    return this.estudianteService.crearEstudiante(createEstudianteDto);
  }

  @Get(':id')
  findEstudianteById(@Param('id') id: string): Promise<EstudianteEntity> {
    return this.estudianteService.findEstudianteById(id);
  }
}

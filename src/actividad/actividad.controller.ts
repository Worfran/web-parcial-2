import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  crearAvtividad(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.crearAvtividad(createActividadDto);
  }

  @Put(':id')
  cambiarEstado(@Param('id') id: string, @Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.cambiarEstado(id, createActividadDto);
  }

  @Get(':fecha')
  obtenerActividadesPorFecha(@Param('fecha') fecha: string) {
    return this.actividadService.findAllActividadesByDate(fecha);
  }

}

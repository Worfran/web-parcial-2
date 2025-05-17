import { Controller, Param, Post } from '@nestjs/common';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';

@Controller('estudiante-actividad')
export class EstudianteActividadController {
    constructor(
        private readonly estudianteActividadService: EstudianteActividadService,
    ) {}

    @Post(':estudianteId/inscribirse/:actividadId')
    async inscribirseActividad(
        @Param('estudianteId') estudianteId: string,
        @Param('actividadId') actividadId: string,
    ): Promise<EstudianteEntity> {
        return await this.estudianteActividadService.inscribirseActividad(estudianteId, actividadId);
    }
    
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteActividadService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(ActividadEntitty)
        private readonly actividadRepository: Repository<ActividadEntitty>
    ){}

    async inscribirseActividad(estudianteid: string, actividadid: string): Promise<EstudianteEntity>{
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteid }, relations: ['actividades'] });

        if (!estudiante) {
            throw new BusinessLogicException('Estudiante not found',
                BusinessError.BAD_REQUEST
            );
        }

        const actividad = await this.actividadRepository.findOne({ where: { id: actividadid } });

        if (!actividad) {
            throw new BusinessLogicException('Actividad not found',
                BusinessError.BAD_REQUEST
            );
        }

        if (estudiante.actividades.some(a => a.id === actividadid)) {
            throw new BusinessLogicException('Estudiante ya inscrito en la actividad',
                BusinessError.BAD_REQUEST
            );
        }

        if ((actividad.cupoMaximo - actividad.estudiantes.length) > 0 && actividad.estado === 0){
            throw new BusinessLogicException('No hay cupos disponibles para la actividad',
                BusinessError.BAD_REQUEST
            );
        }
        
        estudiante.actividades.push(actividad);
        await this.estudianteRepository.save(estudiante);
        return estudiante;
    }
}

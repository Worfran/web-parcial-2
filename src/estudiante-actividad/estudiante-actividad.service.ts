import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';
import { BussinessError, BussinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteActividadService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(ActividadEntitty)
        private readonly actividadRepository: Repository<ActividadEntitty>
    ){}

    async inscribirseActividad(estudianteid: string, actividadid: string): Promise<EstudianteEntity>{
        const estudiante = await this.estudianteRepository.findOne({ 
            where: { id: estudianteid }, 
            relations: ['actividades'] 
        });

        if (!estudiante) {
            throw new BussinessLogicException('Estudiante no encontrado.',
                BussinessError.BAD_REQUEST
            );
        }

        const actividad = await this.actividadRepository.findOne({ 
            where: { id: actividadid },
            relations: ['estudiantes']
         });

        if (!actividad) {
            throw new BussinessLogicException('Actividad no encontrada.',
                BussinessError.BAD_REQUEST
            );
        }

        if (estudiante.actividades.some(a => a.id === actividadid)) {
            throw new BussinessLogicException('Estudiante ya inscrito en la actividad',
                BussinessError.BAD_REQUEST
            );
        }

        if ((actividad.cupoMaximo - actividad.estudiantes.length) <= 0 || actividad.estado !== 0){
            throw new BussinessLogicException('No hay cupos disponibles para la actividad',
                BussinessError.BAD_REQUEST
            );
        }

        estudiante.actividades.push(actividad);
        await this.estudianteRepository.save(estudiante);
        return estudiante;
    }
}

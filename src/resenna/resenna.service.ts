import { Injectable } from '@nestjs/common';
import { CreateResennaDto } from './dto/create-resenna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResennaEntity } from './entities/resenna.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from '../shared/errors/business-errors';
import { EstudianteEntity } from '../estudiante/entities/estudiante.entity';
import { ActividadEntitty } from '../actividad/entities/actividad.entity';


@Injectable()
export class ResennaService {
  constructor(
    @InjectRepository(ResennaEntity)
    private readonly resennaRepository: Repository<ResennaEntity>,

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(ActividadEntitty)
    private readonly actividadRepository: Repository<ActividadEntitty>,
  ){}

  async agregarResenna(createResennaDto: CreateResennaDto): Promise<ResennaEntity> {
    const { estudianteId, actividadId } = createResennaDto;

    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteId },
      relations: ['actividades'],
    });

    if (!estudiante) {
      throw new BussinessLogicException(
        'Estudiante no encontrado.',
        BussinessError.NOT_FOUND,
      );
    }

    const actividad = await this.actividadRepository.findOne({ where: { id: actividadId } });
    if (!actividad) {
      throw new BussinessLogicException(
        'Actividad no encontrada.',
        BussinessError.NOT_FOUND,
      );
    }

    if (actividad.estado !== 2){
      throw new BussinessLogicException(
        'La actividad no ha sido finalizada',
        BussinessError.BAD_REQUEST,
      );
    }

    if (!estudiante.actividades.some(r => r.id === actividadId)) {
      throw new BussinessLogicException(
        'El estudiante no está inscrito en la actividad.',
        BussinessError.BAD_REQUEST,
      );
    }

    const nuevaResenna = this.resennaRepository.create(createResennaDto);
    return this.resennaRepository.save(nuevaResenna);
  }

}

import { Injectable } from '@nestjs/common';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntitty } from './entities/actividad.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';


@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadEntitty)
    private readonly actividadRepository: Repository<ActividadEntitty>
  ){}

  async create(createActividadDto: CreateActividadDto): Promise<ActividadEntitty> {
      const { estado } = createActividadDto;
      if (estado !== 0){
        throw new BusinessLogicException(
          'Las actividades deben ser creadas con estado abierto.',
          BusinessError.BAD_REQUEST,
        )
      }
      const nuevoActividad = this.actividadRepository.create(createActividadDto);
      return this.actividadRepository.save(nuevoActividad);
  }

  async findOne(id: string): Promise<ActividadEntitty>{
    const actividad = await this.actividadRepository.findOne({
      where: {id}

    });

    if (!actividad){
      throw new BusinessLogicException(
        'No se encontro la actividad',
        BusinessError.NOT_FOUND
      )
    }

    return actividad;
  }

  async cambiarEstado(id: string, createActividadDto: CreateActividadDto): Promise<ActividadEntitty> {
      const { estado } = createActividadDto;
      const actividad = this.findOne(id);

      if (estado === 1){
        const cupo = (await actividad).cupoMaximo
        const estudiantesl = (await actividad).estudiantes.length
        if (estudiantesl/cupo <= 0.8){
          throw new BusinessLogicException(
            'No se puede cerrar la actividad con el cupo registrado',
            BusinessError.BAD_REQUEST
          )
        }
      }
      else if (estado === 2){
        const cupo = (await actividad).cupoMaximo
        const estudiantesl = (await actividad).estudiantes.length
        if (cupo - estudiantesl != 0){
          throw new BusinessLogicException(
            'No se puede finalizar la actividad, aun hay cupo',
            BusinessError.BAD_REQUEST
          )
        }
      }
      else {
        throw new BusinessLogicException(
          'El estado no es valido',
          BusinessError.BAD_REQUEST
        )
      }
      const actividadU = this.actividadRepository.save(
        {...actividad,
          ...createActividadDto,
        }
      );
      return actividadU;
  }
}

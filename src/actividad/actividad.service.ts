import { Injectable } from '@nestjs/common';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntitty } from './entities/actividad.entity';
import { BussinessError, BussinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadEntitty)
    private readonly actividadRepository: Repository<ActividadEntitty>
  ){}

  async crearAvtividad(createActividadDto: CreateActividadDto): Promise<ActividadEntitty> {
      const { titulo, estado } = createActividadDto;
      if (estado !== 0){
        throw new BussinessLogicException(
          'Las actividades deben ser creadas con estado abierto.',
          BussinessError.BAD_REQUEST,
        )
      }

      if (titulo.length < 15 && titulo.includes("[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]") ){
        throw new BussinessLogicException(
          'El titulo de la actividad no es valido.',
          BussinessError.BAD_REQUEST,
        )
      }
      
      const nuevoActividad = this.actividadRepository.create(createActividadDto);
      return this.actividadRepository.save(nuevoActividad);
  }

  async findOne(id: string): Promise<ActividadEntitty>{
    const actividad = await this.actividadRepository.findOne({
      where: {id},
      relations: ['estudiantes', 'resennas'],
    });

    if (!actividad){
      throw new BussinessLogicException(
        'No se encontro la actividad',
        BussinessError.NOT_FOUND
      )
    }

    return actividad;
  }

  async cambiarEstado(id: string, createActividadDto: CreateActividadDto): Promise<ActividadEntitty> {
    const { estado } = createActividadDto;
    const actividad = await this.findOne(id);
    const { cupoMaximo, estudiantes } = actividad;
    const estudiantesl = estudiantes.length;

    if ( (estado === 1) && (estudiantesl / cupoMaximo <= 0.8)) {
      throw new BussinessLogicException(
          'No se puede cerrar la actividad con el cupo registrado',
          BussinessError.BAD_REQUEST
      );
    } else if ( (estado === 2) && (cupoMaximo - estudiantesl !== 0)) {
      throw new BussinessLogicException(
          'No se puede finalizar la actividad, aun hay cupo',
          BussinessError.BAD_REQUEST
      );
    } else if ( (estado !== 0) && (estado !== 1) && (estado !== 2)) {
      throw new BussinessLogicException(
          'El estado no es valido',
          BussinessError.BAD_REQUEST
      );
    }

    actividad.estado = estado;
    return await this.actividadRepository.save(actividad);

  }

  async findAllActividadesByDate(date: string): Promise<ActividadEntitty[]> {
    const actividades = await this.actividadRepository.find({
      where: { fecha: date },
      relations: ['estudiantes', 'resennas'],
    });

    if (actividades.length === 0) {
      throw new BussinessLogicException(
        'No se encontraron actividades para la fecha especificada',
        BussinessError.NOT_FOUND
      );
    }

    return actividades;
  }
}

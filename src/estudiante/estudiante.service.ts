import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { EstudianteEntity } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly usuarioEstudiante: Repository<EstudianteEntity>,
  ) {}

  async create(createUsuarioDto: CreateEstudianteDto): Promise<EstudianteEntity> {
    const { correo, semestre } = createUsuarioDto;

    if (!correo.match('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')){
      throw new BussinessLogicException(
        'Email format not valid.',
        BussinessError.BAD_REQUEST
      )
    }

    if (semestre < 1 && semestre > 10){
      throw new BussinessLogicException(
        'El semestre ingresado no es valido.',
        BussinessError.BAD_REQUEST
      )
    }

    const nuevoUsuario = this.usuarioEstudiante.create(createUsuarioDto);
    return this.usuarioEstudiante.save(nuevoUsuario);
  }

  async findOne(id: string): Promise<EstudianteEntity> {
    const estudiante = await this.usuarioEstudiante.findOneBy({ id })

    if (!estudiante){
      throw new BussinessLogicException(
        'estudiante no encontrado.',
        BussinessError.NOT_FOUND,
      );
    }

    return estudiante ;
  }

}


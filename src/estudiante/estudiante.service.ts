import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { EstudianteEntity } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly usuarioEstudiante: Repository<EstudianteEntity>,
  ) {}

  async create(createUsuarioDto: CreateEstudianteDto): Promise<EstudianteEntity> {
    const { correo, semestre } = createUsuarioDto;

    if (!correo.match('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')){
      throw new BusinessLogicException(
        'Email format not valid.',
        BusinessError.BAD_REQUEST
      )
    }

    if (semestre < 1 && semestre > 10){
      throw new BusinessLogicException(
        'El semestre ingresado no es valido.',
        BusinessError.BAD_REQUEST
      )
    }
    
    const nuevoUsuario = this.usuarioEstudiante.create(createUsuarioDto);
    return this.usuarioEstudiante.save(nuevoUsuario);
  }

  async findOne(id: string): Promise<EstudianteEntity> {
    const estudiante = await this.usuarioEstudiante.findOneBy({ id })

    if (!estudiante){
      throw new BusinessLogicException(
        'estudiante no encontrado.',
        BusinessError.NOT_FOUND,
      );
    }

    return estudiante ;
  }

}


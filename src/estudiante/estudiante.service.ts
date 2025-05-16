import { BadRequestException, Injectable } from '@nestjs/common';
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
    const nuevoUsuario = this.usuarioEstudiante.create(createUsuarioDto);
    return this.usuarioEstudiante.save(nuevoUsuario);
  }

  async findAll(): Promise<EstudianteEntity[]> {
    return this.usuarioEstudiante.find();
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

  async findByEmail(correo: string): Promise<EstudianteEntity> {
    const estudiante = await this.usuarioEstudiante.findOne({ where: { correo } })
    if (!estudiante){
      throw new BusinessLogicException(
        'estudiante no encontrado.',
        BusinessError.NOT_FOUND,
      );
    }

    return estudiante ;
  }

  async remove(id: string): Promise<void> {
    await this.usuarioEstudiante.delete(id);
  }
}

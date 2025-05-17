import { Inject, Injectable } from '@nestjs/common';
import { CreateResennaDto } from './dto/create-resenna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResennaEntity } from './entities/resenna.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class ResennaService {
  constructor(
    @InjectRepository(ResennaEntity)
    private readonly resennaRepository: Repository<ResennaEntity>,
  ){}

  async create(createResennaDto: CreateResennaDto): Promise<ResennaEntity> {
    const nuevaResenna = this.resennaRepository.create(createResennaDto);
    return this.resennaRepository.save(nuevaResenna);
  }

  async findOne(id: string): Promise<ResennaEntity> {
    const resenna = await this.resennaRepository.findOne({ where: { id } });

    if (!resenna) {
      throw new BussinessLogicException(
        'Resenna not found',
        BussinessError.NOT_FOUND,
      );
    }

    return resenna;
  }
}

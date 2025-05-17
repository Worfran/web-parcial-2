import { Injectable } from '@nestjs/common';
import { CreateResennaDto } from './dto/create-resenna.dto';


@Injectable()
export class ResennaService {
  create(createResennaDto: CreateResennaDto) {
    return 'This action adds a new resenna';
  }

  findAll() {
    return `This action returns all resenna`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resenna`;
  }


  remove(id: number) {
    return `This action removes a #${id} resenna`;
  }
}

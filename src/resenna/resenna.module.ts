import { Module } from '@nestjs/common';
import { ResennaService } from './resenna.service';
import { ResennaController } from './resenna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResennaEntity } from './entities/resenna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResennaEntity])],
  controllers: [ResennaController],
  providers: [ResennaService],
})
export class ResennaModule {}

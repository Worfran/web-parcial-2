import { Module } from '@nestjs/common';
import { ResennaService } from './resenna.service';
import { ResennaController } from './resenna.controller';

@Module({
  controllers: [ResennaController],
  providers: [ResennaService],
})
export class ResennaModule {}

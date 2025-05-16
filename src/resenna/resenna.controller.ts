import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResennaService } from './resenna.service';
import { CreateResennaDto } from './dto/create-resenna.dto';
import { UpdateResennaDto } from './dto/update-resenna.dto';

@Controller('resenna')
export class ResennaController {
  constructor(private readonly resennaService: ResennaService) {}

  @Post()
  create(@Body() createResennaDto: CreateResennaDto) {
    return this.resennaService.create(createResennaDto);
  }

  @Get()
  findAll() {
    return this.resennaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resennaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResennaDto: UpdateResennaDto) {
    return this.resennaService.update(+id, updateResennaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resennaService.remove(+id);
  }
}

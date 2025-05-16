import { PartialType } from '@nestjs/mapped-types';
import { CreateResennaDto } from './create-resenna.dto';

export class UpdateResennaDto extends PartialType(CreateResennaDto) {}

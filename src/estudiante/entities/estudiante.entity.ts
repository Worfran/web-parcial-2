import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { ActividadEntitty } from '../../actividad/entities/actividad.entity';


@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @ManyToMany(() => ActividadEntitty, actividad => actividad.estudiantes)
  actividades: ActividadEntitty[];
  
}

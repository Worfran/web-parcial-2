import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable} from 'typeorm';
import { ActividadEntitty } from '../../actividad/entities/actividad.entity';
import { ResennaEntity } from '../../resenna/entities/resenna.entity';


@Entity('estudiante')
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
  @JoinTable()
  actividades: ActividadEntitty[];

  @OneToMany( () => ResennaEntity, resenna => resenna.estudiante)
  resennas: ResennaEntity[];
  
}

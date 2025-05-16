import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, OneToOne} from 'typeorm';


@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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
  
}

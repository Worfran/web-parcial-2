import { EstudianteEntity } from "../../estudiante/entities/estudiante.entity";
import { ResennaEntity } from "../../resenna/entities/resenna.entity";
import { Column, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class ActividadEntitty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    fecha: string;

    @Column()
    cupoMaximo: number;

    @Column()
    estado: number;

    @ManyToMany(() => EstudianteEntity, estudiante => estudiante.actividades)
    estudiantes: EstudianteEntity[];

    @OneToMany( () => ResennaEntity, resenna => resenna.actividad)
    resennas: ResennaEntity[];
}


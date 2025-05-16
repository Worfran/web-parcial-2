import { EstudianteEntity } from "src/estudiante/entities/estudiante.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
}


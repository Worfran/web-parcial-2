import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm"
import { ActividadEntitty } from "../../actividad/entities/actividad.entity";

@Entity('resenna')
export class ResennaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fecha: string;

    @ManyToOne( () => ActividadEntitty, actividad => actividad.resennas)
    actividad: ActividadEntitty;

    @ManyToOne( () => ActividadEntitty, actividad => actividad.resennas)
    estudiante: ActividadEntitty;

}

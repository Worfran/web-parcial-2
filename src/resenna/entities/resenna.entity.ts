import { ActividadEntitty } from "../../actividad/entities/actividad.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"



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

}

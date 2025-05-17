import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";



export class CreateResennaDto {
    @IsString()
    @IsNotEmpty()
    comentario: string;
    
    @IsNumber()
    @IsNotEmpty()
    calificacion: number;

    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsUUID()
    @IsNotEmpty()
    actividadId: string;

    @IsUUID()
    @IsNotEmpty()
    estudianteId: string;
    
}

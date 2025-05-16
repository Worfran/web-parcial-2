import { IsDate, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateActividadDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsDate()
    @IsNotEmpty()
    fecha: string;

    @IsNumber()
    @IsNotEmpty()
    cupoMaximo: number;

    @IsIn([0, 1, 3])
    @IsNotEmpty()
    estado: number;
}

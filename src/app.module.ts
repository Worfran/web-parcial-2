import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ResennaModule } from './resenna/resenna.module';
import { EstudianteEntity } from './estudiante/entities/estudiante.entity';
import { ActividadEntitty } from './actividad/entities/actividad.entity';
import { ResennaEntity } from './resenna/entities/resenna.entity';
import { EstudianteActividadModule } from './estudiante-actividad/estudiante-actividad.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities:[
        EstudianteEntity,
        ActividadEntitty,
        ResennaEntity
      ],
      synchronize: true,
      dropSchema: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static/',
    }),
    EstudianteModule,
    ActividadModule,
    ResennaModule,
    EstudianteActividadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


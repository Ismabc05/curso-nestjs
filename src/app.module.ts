// Este modulo es el modulo principal de la aplicacion, aqui se importan todos los modulos que se van a usar en la aplicacion, ademas de configurar la conexion a la base de datos y las variables de entorno
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Le decimos que puedes usar el modulo de configuracion de manera global, este contiene configservice que a su vez contiene mis variables de entorno
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // Conectamos typeorm con nuestra base de datos para poder interactuar sobre ella
      useFactory: (configService: ConfigService<Env>) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL', { infer: true }),
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    AiModule,
  ],
})
export class AppModule {}

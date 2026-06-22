import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // Importamos el módulo de configuración para manejar variables de entorno de forma global
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}

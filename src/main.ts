// este es el punto inicial de la aplicacion, aqui se levanta el servidor y se inicializa la aplicacion
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Habilita de forma globar las validaciones de los DTOS.
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});

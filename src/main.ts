// este es el punto inicial de la aplicacion, aqui se levanta el servidor y se inicializa la aplicacion
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Habilita de forma global las validaciones de los DTOS.
    new ValidationPipe({
      whitelist: true, // whitelist: elimina propiedades que no estan definidas en los DTOs.
      forbidNonWhitelisted: true, // forbidNonWhitelisted: lanza un error si se envian propiedades que no estan definidas en los DTOs.
      transform: true, // convierte automáticamente los datos al tipo definido en el DTO.
      transformOptions: {
        enableImplicitConversion: true, // habilita la conversión automática de tipos, por ejemplo de string a number.
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // habilita de forma global la serialización de las entidades, por ejemplo para excluir la contraseña del usuario.

  // Configuración de Swagger para la documentación de la API
  const config = new DocumentBuilder().setTitle('My Blog API').setDescription('API para el blog').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.use(helmet());
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});

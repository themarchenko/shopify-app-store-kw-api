import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Configure Swagger options
  const config = new DocumentBuilder()
    .setTitle('Keyword Analysis API')
    .setDescription('API for managing keyword analyses and competitors')
    .setVersion('1.0')
    .build();

  // Create the Swagger document and setup Swagger UI
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api

  await app.listen(3001);
}

bootstrap();

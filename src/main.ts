import { NestFactory } from '@nestjs/core';
import { WellnessAppModule } from './wellness-app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WellnessAppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Journal API')
    .setDescription('API documentation for the Wellness Journal application')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('user', 'User management endpoints')
    .addTag('entry', 'Journal entry management endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('App started :) ');
  console.log('API documentation available at http://localhost:3000/api/docs');
}
bootstrap();

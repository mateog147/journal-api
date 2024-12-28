import { NestFactory } from '@nestjs/core';
import { WellnessAppModule } from './wellness-app.module';

async function bootstrap() {
  const app = await NestFactory.create(WellnessAppModule);
  await app.listen(3000);
  console.log('App started :) ');
}
bootstrap();

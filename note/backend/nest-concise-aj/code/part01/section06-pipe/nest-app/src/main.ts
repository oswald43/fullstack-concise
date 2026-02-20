/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global registration of pipe
  // https://docs.nestjs.com/pipes#class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // filter but not reject
      forbidNonWhitelisted: true, // reject
      transform: true, // transform type with ts
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

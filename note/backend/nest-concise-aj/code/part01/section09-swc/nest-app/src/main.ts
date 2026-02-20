/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger docs
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('todo-app')
    .setDescription('The todos API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://todo-app.com', 'Production server')
    .addTag('todos')
    .build();
  await SwaggerModule.loadPluginMetadata(metadata);
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // // http://localhost:3000/api
  // // http://localhost:3000/api-json
  // SwaggerModule.setup('api', app, documentFactory);
  // http://localhost:3000/swagger
  // http://localhost:3000/swagger/json
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

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

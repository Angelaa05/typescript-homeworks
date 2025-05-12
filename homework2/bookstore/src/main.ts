import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      // Whitelist allows only properties with decorators
      whitelist: true,
      // Forbid throws an error if a property that doesn't exist in the DTO is sent with the request
      forbidNonWhitelisted: true,
      transformOptions: {
        // Removes undefined props for optional update DTO to prevent writing errors
        exposeUnsetFields: false,
      },
    }),
  );

  app.use(express.json()); // Ensure request body parsing for Postman

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

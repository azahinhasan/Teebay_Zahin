import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
// import { JwtMiddleware } from './common/jwt.middleware';
import { JwtService } from '@nestjs/jwt'; 
import { NestMiddleware } from '@nestjs/common/interfaces/middleware';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Apply the JWT Middleware
  // app.use((req, res, next) => {
  //   const jwtMiddleware = new JwtMiddleware(app.get(JwtService)); 
  //   console.log(req)
  //   jwtMiddleware.use(req, res, next); 
  // });

  // Uncomment to enable CORS
  // app.enableCors();

  await app.listen(process.env.APP_PORT || 5212);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './providers/logger/logger.service';
import { setupSwagger } from './swagger';
import { TransformResponseInterceptor } from './core/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app); //Implement Swagger

  //Logger
  const logger = app.get(LoggerService);
  try {
    const configService = app.get(ConfigService);
    // const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

    // app.enableCors({
    //   origin: function (origin, callback) {
    //     if (!origin || allowedOrigins.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'));
    //     }
    //   },
    //   // credentials: true,
    // });
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformResponseInterceptor());

    // Use cookie-parser middleware

    //Versioning
    app.setGlobalPrefix('/api/v1');
    await app.listen(configService.get('APP.APP_PORT') || 3000);

    logger.log(
      `Application is running on: ${configService.get('APP.APP_URL')}/${configService.get('APP.APP_PORT')} `,
    );
  } catch (error) {
    logger.error('Error starting the application:', error);
  }
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  // app.setGlobalPrefix('/api');
  app.useStaticAssets(join(__dirname, '..', 'public/upload'), {
    prefix: '/public/upload',
  });

  await app.listen(configService.get('apps.gateway.port'));
  console.log(
    `GatewayModule Application is running on: ${await app.getUrl()} port: ${configService.get('apps.gateway.port')}`,
  );
}
bootstrap();

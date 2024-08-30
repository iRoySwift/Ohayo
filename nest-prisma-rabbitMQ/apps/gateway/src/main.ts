import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpSuccessService } from '@/libs/interceptor/HttpSuccess/HttpSuccess.service';
import { HttpExceptionService } from '@/libs/interceptor/HttpException/HttpException.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);

  app.enableCors();

  // 静态文件服务器
  // app.setGlobalPrefix('/api');
  app.useStaticAssets(join(__dirname, '..', 'public/upload'), {
    prefix: '/public/upload',
  });

  // 管道接口参数校验
  app.useGlobalPipes(new ValidationPipe());

  // 日志拦截器
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // 响应拦截
  app.useGlobalInterceptors(new HttpSuccessService());
  app.useGlobalFilters(new HttpExceptionService(logger));

  await app.listen(configService.get('apps.gateway.port'));
  console.log(
    `GatewayModule Application is running on: ${await app.getUrl()} port: ${configService.get('apps.gateway.port')}`,
  );
}
bootstrap();

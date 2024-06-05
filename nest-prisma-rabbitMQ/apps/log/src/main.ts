import { NestFactory } from '@nestjs/core';
import { LogModule } from './log.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from 'libs/common';
import { RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(LogModule);
  // const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('LOG', true));
  app.startAllMicroservices();

  // await app.listen(configService.get('PORT'));
}
bootstrap();

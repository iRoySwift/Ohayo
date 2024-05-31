import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { getCorrelationId } from 'utils/get-correlation-id';
import { Request } from 'express';
import { LoggerMiddleware } from './logger.middleware';
import { join } from 'path';
import { loggerOptions } from './logger.config';

@Module({
  imports: [
    PinoModule.forRootAsync({
      useFactory: async () => {
        return loggerOptions;
      },
    }),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

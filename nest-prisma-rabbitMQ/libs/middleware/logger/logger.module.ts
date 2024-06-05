import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { LoggerMiddleware } from './logger.middleware';
import { loggerOptions } from './logger.config';

@Module({
  imports: [
    PinoModule.forRootAsync({
      useFactory: async () => {
        return loggerOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

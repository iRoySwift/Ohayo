import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';
import { LoggerModule } from '@app/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required().port().default(3000),
        DATABASE_URL: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: ['./apps/log/.env', './.env'],
    }),
    DatabaseModule,
    RmqModule,
    LoggerModule,
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}

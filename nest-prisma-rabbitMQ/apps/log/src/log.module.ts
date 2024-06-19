import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';
import { LoggerModule } from '@app/middleware';
import { GlobalModule } from '@/libs/common/global/global.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     PORT: Joi.number().required().port().default(3000),
    //   }),
    //   envFilePath: [`./apps/log/.env.${process.env.NODE_ENV}`],
    // }),
    GlobalModule.forRoot(),
    DatabaseModule,
    RmqModule,
    LoggerModule,
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}

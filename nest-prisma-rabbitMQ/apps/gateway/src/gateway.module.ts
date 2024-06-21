import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { RmqModule, AuthModule } from '@app/common';
import { AUTH_SERVICE, LOG_SERVICE } from '@/libs/constants';
import { LoggerModule } from '@app/middleware';
import { GlobalModule } from '@/libs/common/global/global.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     PORT: Joi.number().required().port().default(3000),
    //   }),
    //   envFilePath: [`./apps/gateway/.env.${process.env.NODE_ENV}`],
    // }),
    GlobalModule.forRoot(),
    RmqModule.register(AUTH_SERVICE),
    RmqModule.register(LOG_SERVICE),
    AuthModule,
    LoggerModule,
  ],
  controllers: [GatewayController, AuthController],
  providers: [],
})
export class GatewayModule {}

import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { RmqModule, AuthModule as AuthCommonModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { AUTH_SERVICE, LOG_SERVICE } from '@/libs/constants';
import { LoggerModule } from '@app/middleware';
import { GlobalModule } from '@/libs/common/global/global.module';

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
    AuthCommonModule,
    AuthModule,
    RmqModule.register([{ name: AUTH_SERVICE }, { name: LOG_SERVICE }]),
    LoggerModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

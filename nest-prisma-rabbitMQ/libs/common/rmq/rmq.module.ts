import { DynamicModule, Global, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

interface RmqModuleOptions {
  name: string;
}

@Global()
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: false,
    //   validationSchema: Joi.object({
    //     RABBIT_MQ_URI: Joi.string().required(),
    //     RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
    //   }),
    //   envFilePath: [`./.env.${process.env.NODE_ENV}`],
    // }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register(rmqs: RmqModuleOptions[]): DynamicModule {
    const options: any = rmqs.map((item) => ({
      name: item.name,
      useFactory: (configService: ConfigService) => {
        return {
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('config.rabbit_mq_uri')],
            queue: configService.get<string>(
              `config.rabbit_mq_${item.name.toLowerCase()}_queue`,
            ),
            queueOptions: {
              durable: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }));
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync(options),
        // ClientsModule.registerAsync([
        //   {
        //     name: 'AUTH',
        //     useFactory: (configService: ConfigService) => {
        //       return {
        //         transport: Transport.RMQ,
        //         options: {
        //           urls: [configService.get<string>('config.rabbit_mq_uri')],
        //           queue: configService.get<string>(
        //             `config.rabbit_mq_auth_queue`,
        //           ),
        //         },
        //       };
        //     },
        //     inject: [ConfigService],
        //   },
        //   {
        //     name: 'LOG',
        //     useFactory: (configService: ConfigService) => {
        //       return {
        //         transport: Transport.RMQ,
        //         options: {
        //           urls: [configService.get<string>('config.rabbit_mq_uri')],
        //           queue: configService.get<string>(
        //             `config.rabbit_mq_log_queue`,
        //           ),
        //         },
        //       };
        //     },
        //     inject: [ConfigService],
        //   },
        // ]),
      ],
      exports: [ClientsModule],
    };
  }
}

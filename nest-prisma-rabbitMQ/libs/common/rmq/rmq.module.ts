import { DynamicModule, Global, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

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
  static register(name: string): DynamicModule {
    const providers = [
      {
        provide: name,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('config.rabbit_mq_uri')],
              queue: configService.get<string>(
                `config.rabbit_mq_${name.toLowerCase()}_queue`,
              ),
              queueOptions: {
                durable: true,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: RmqModule,
      // imports: [
      //   ClientsModule.registerAsync([
      //     {
      //       name,
      //       useFactory: (configService: ConfigService) => {
      //         return {
      //           transport: Transport.RMQ,
      //           options: {
      //             urls: [configService.get<string>('config.rabbit_mq_uri')],
      //             queue: configService.get<string>(
      //               `config.rabbit_mq_${name.toLowerCase()}_queue`,
      //             ),
      //             queueOptions: {
      //               durable: true,
      //             },
      //           },
      //         };
      //       },
      //       inject: [ConfigService],
      //     },
      //   ]),
      // ],
      providers,
      exports: providers,
    };
  }
}

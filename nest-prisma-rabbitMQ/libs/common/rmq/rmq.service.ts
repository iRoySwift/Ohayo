import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('config.rabbit_mq_uri')],
        queue: this.configService.get<string>(
          `config.rabbit_mq_${queue.toLowerCase()}_queue`,
        ),
        persistent: true,
        noAck,
      },
    };
  }
}

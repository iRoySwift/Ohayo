import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request } from 'express';

@Injectable()
export class GatewayService {
  constructor(
    @InjectPinoLogger(GatewayService.name) private readonly logger: PinoLogger,
  ) {}

  getHello(request: Request): string {
    this.logger.trace({ foo: 'bar' }, 'baz %s', 'qux');
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.info((request as any).remoteAddress);
    return 'Hello World!';
  }
}

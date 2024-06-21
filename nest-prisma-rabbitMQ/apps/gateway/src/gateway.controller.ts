import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@/libs/constants';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request } from 'express';

@Controller('/api')
export class GatewayController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    @InjectPinoLogger(GatewayController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  testHello(@Req() request: Request) {
    this.logger.trace({ foo: 'bar' }, 'baz %s', 'qux');
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.info((request as any).remoteAddress);
    const record = 'hello';
    const result = this.authClient.send('test', record).subscribe();
    return record;
  }
}

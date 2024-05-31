import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtAuthGuard } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@libs/constants';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject(AUTH_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(@Req() req: any) {
    return this.gatewayService.getHello(req);
  }

  @Get('/hello')
  @UseGuards(JwtAuthGuard)
  testHello(@Req() req: any) {
    const record = 'hello';
    const result = this.client.send('test', record).subscribe();
    return record;
  }
}

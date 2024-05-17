import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtAuthGuard } from '@app/common';
import { AUTH_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject(AUTH_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Get('/hello')
  @UseGuards(JwtAuthGuard)
  getHello(@Req() req: any) {
    const record = 'hello';
    const result = this.client.send('test', record).subscribe();
    return this.gatewayService.getHello();
  }
}

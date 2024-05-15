import { Body, Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants/services';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(AUTH_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Req() req: any) {
    const record = 'hello';
    const result = this.client.send('test', record).subscribe();
    return this.appService.getHello();
  }
}

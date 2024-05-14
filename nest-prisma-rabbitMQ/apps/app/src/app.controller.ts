import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    const record = 'hello';
    const result = this.client.send('test', record).subscribe();
    console.log('result', result);
    return this.appService.getHello();
  }
}

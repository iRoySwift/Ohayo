import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly logService: LoggerService) {}

  @Get()
  getHello(): string {
    return this.logService.getHello();
  }
}

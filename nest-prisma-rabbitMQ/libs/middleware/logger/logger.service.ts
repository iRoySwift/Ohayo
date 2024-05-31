import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger: Logger = new Logger(LoggerService.name);
  getHello(): string {
    return 'Hello World!';
  }

  log(data: any): void {
    this.logger.log('log...', data);
  }
}

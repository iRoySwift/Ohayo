import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private readonly logger: Logger = new Logger(LogService.name);
  getHello(): string {
    return 'Hello World!';
  }

  log(data: any): void {
    this.logger.log('log...', data);
  }
}

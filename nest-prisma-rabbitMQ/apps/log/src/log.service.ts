import { iUser } from '@/typescript/user';
import { DatabaseService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { LogLogin } from './dto/create-login-log';

@Injectable()
export class LogService {
  constructor(
    @InjectPinoLogger(LogService.name) private logger: PinoLogger,
    private readonly databaseService: DatabaseService,
  ) {}

  async createLoginLog(data: LogLogin) {
    return await this.databaseService.log_login.create({
      data,
    });
  }
}

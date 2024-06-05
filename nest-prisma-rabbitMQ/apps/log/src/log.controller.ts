import { Controller, Get, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { LOG_LOGIN } from '@/libs/constants/ClientService';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogLogin } from './dto/create-login-log';

@Controller('/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern(LOG_LOGIN)
  async createLoginLog(@Payload() data: LogLogin) {
    return this.logService.createLoginLog(data);
  }
}

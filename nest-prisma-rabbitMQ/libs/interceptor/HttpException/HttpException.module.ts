import { Module } from '@nestjs/common';
import { HttpExceptionService } from './HttpException.service';

@Module({
  providers: [HttpExceptionService],
  exports: [HttpExceptionService],
})
export class HttpExceptionModule {}

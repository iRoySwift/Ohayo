import { Module } from '@nestjs/common';
import { HttpSuccessService } from './HttpSuccess.service';

@Module({
  providers: [HttpSuccessService],
  exports: [HttpSuccessService],
})
export class HttpSuccessModule {}

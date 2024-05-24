import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './jwt_auth.guard';
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from '@libs/constants';

@Global()
@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard, RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule, RmqModule } from '@app/common';
import { GlobalModule } from '@/libs/common/global/global.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     PORT: Joi.number().required().port().default(3001),
    //     JWT_SECRET: Joi.string().required(),
    //     JWT_EXPIRATION: Joi.number().required(),
    //   }),
    //   envFilePath: [`./apps/auth/.env.${process.env.NODE_ENV}`],
    // }),
    GlobalModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('apps.auth.jwt_secret'),
        signOptions: {
          expiresIn: `${configService.get<number>('apps.auth.jwt_expiration')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

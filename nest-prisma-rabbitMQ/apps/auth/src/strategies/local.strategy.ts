import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../users/entities/user.entity';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | any> {
    const user = await this.authService.validate(username, password);
    console.log(
      '🚀 ~ LocalStrategy ~ classLocalStrategyextendsPassportStrategy ~ user:',
      user,
    );
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}

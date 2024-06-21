import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService?.findUserByUsername(username);
    if (!user.password) {
      return user;
    }
    const passwordIsValid = await bcrypt.compare(pass, user.password);
    if (passwordIsValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, res: Response) {
    if (!user.id) {
      return user;
    }
    const payload = { username: user.username, id: user.id };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('apps.auth.jwt_expiration'),
    );
    const token = this.jwtService.sign(payload);

    res?.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return { user, token };
  }

  logout(res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
    return { isLogout: true };
  }
}

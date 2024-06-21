import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';
import { User } from './users/entities/user.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_LOGIN, AUTH_VALIDATEJWT } from '@/libs/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AUTH_VALIDATEJWT)
  async verifyJwt(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern(AUTH_LOGIN)
  @Post('login')
  async login(
    @Payload() data: string,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}

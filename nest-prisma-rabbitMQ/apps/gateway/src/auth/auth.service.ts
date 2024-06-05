import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { lastValueFrom } from 'rxjs';
import {
  AUTH_SERVICE,
  AUTH_USERS_CREATE,
  AUTH_LOGIN,
  LOG_LOGIN,
  LOG_SERVICE,
} from '@/libs/constants';
import { response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    @Inject(LOG_SERVICE) private readonly logClient: ClientProxy,
  ) {}

  async create(createAuthUserDto: CreateAuthUserDto) {
    return await lastValueFrom(
      this.authClient.send(AUTH_USERS_CREATE, createAuthUserDto),
    );
  }

  async login(createAuthUserDto: CreateAuthUserDto, req: Request) {
    const loginInfo = await lastValueFrom(
      this.authClient.send(AUTH_LOGIN, { body: createAuthUserDto }),
    );
    await lastValueFrom(
      this.logClient.send(LOG_LOGIN, {
        userId: loginInfo.user.id,
        ip: req.ip,
      }),
    );
    return loginInfo;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

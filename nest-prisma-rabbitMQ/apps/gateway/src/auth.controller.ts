import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@/apps/auth/src/users/dto/create-user.dto';
import { lastValueFrom } from 'rxjs';
import {
  AUTH_LOGIN,
  AUTH_SERVICE,
  AUTH_USERS_CREATE,
  AUTH_USER_FINDALL,
  LOG_LOGIN,
  LOG_SERVICE,
} from '@/libs/constants';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '@/libs/common';
import { UpdateUserDto } from '@/apps/auth/src/users/dto/update-user.dto';

@Controller('/api/auth1')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    @Inject(LOG_SERVICE) private readonly logClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    return await lastValueFrom(
      this.authClient.send(AUTH_USERS_CREATE, createUser),
    );
  }

  @Post('login')
  async login(@Body() createUser: CreateUserDto, @Req() req) {
    const loginInfo = await lastValueFrom(
      this.authClient.send(AUTH_LOGIN, { body: createUser }),
    );
    await lastValueFrom(
      this.logClient.send(LOG_LOGIN, {
        userId: loginInfo.user.id,
        ip: req.ip,
      }),
    );
    return loginInfo;
  }

  @Get('getUsers')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req) {
    const authorization = req.headers.authorization;
    return await lastValueFrom(
      this.authClient.send(AUTH_USER_FINDALL, {
        headers: {
          authorization,
        },
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} auth`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} auth`;
  }
}

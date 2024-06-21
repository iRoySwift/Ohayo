import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  AUTH_USERS_CREATE,
  AUTH_USER_FINDALL,
  AUTH_USER_FINDONE,
} from '@/libs/constants';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(AUTH_USERS_CREATE)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AUTH_USER_FINDALL)
  @Get()
  findAll(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.usersService.findAll();
  }
  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  @MessagePattern(AUTH_USER_FINDONE)
  findOne(@Param('id') id: string, @Payload() payload: { id: number }) {
    return this.usersService.findOne(+payload.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

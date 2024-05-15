import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@app/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.databaseService.auth_users.findUnique({
      where: { username },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const isUserNameExsit = await this.findUserByUsername(
      createUserDto.username,
    );
    if (isUserNameExsit)
      throw new UnprocessableEntityException('User already exists');
    return await this.databaseService.auth_users.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }

  async findAll() {
    return await this.databaseService.auth_users.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.auth_users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.auth_users.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.databaseService.auth_users.delete({ where: { id } });
  }
}

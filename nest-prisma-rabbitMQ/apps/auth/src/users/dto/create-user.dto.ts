import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username 不能为空' })
  username: string;
  @IsNotEmpty({ message: 'password 不能为空' })
  password: string;
  @IsEmail()
  email: string;
}

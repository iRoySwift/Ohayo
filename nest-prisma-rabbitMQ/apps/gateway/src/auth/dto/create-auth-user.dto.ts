import { IsNotEmpty } from 'class-validator';

export class CreateAuthUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

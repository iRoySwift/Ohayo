import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { iUser } from 'typescript/user';

export class LogLogin {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @ValidateNested()
  user: iUser;

  @IsString()
  ip: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

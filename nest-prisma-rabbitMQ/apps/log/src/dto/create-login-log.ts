import { IsNumber, IsString } from 'class-validator';

export class LogLogin {
  @IsNumber()
  userId: number;

  @IsString()
  ip: string;
}

import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  isDate,
} from 'class-validator';

export class User {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

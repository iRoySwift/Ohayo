import {
  IsDate,
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

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

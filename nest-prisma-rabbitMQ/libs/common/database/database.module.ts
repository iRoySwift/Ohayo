import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: false,
    //   validationSchema: Joi.object({
    //     DATABASE_URL: Joi.string().required(),
    //     MYSQL_DATABASE: Joi.string().required(),
    //     MYSQL_ROOT_PASSWORD: Joi.string().required(),
    //   }),
    //   envFilePath: [`./.env.${process.env.NODE_ENV}`],
    // }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

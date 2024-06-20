import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

@Module({})
export class GlobalModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    const imports: DynamicModule['imports'] = [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [
          () => {
            const ss = yaml.load(
              readFileSync(join(`${process.env.NODE_ENV}.yaml`), 'utf8'),
            ) as Record<string, any>;
            return ss;
          },
        ],
      }),
    ];
    return {
      module: GlobalModule,
      imports,
      providers: [],
    };
  }
}

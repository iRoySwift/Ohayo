import { NestFactory } from '@nestjs/core';
import { LogModule } from './log.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(LogModule);
  const configService = app.get(ConfigService);
  console.log(
    "🚀 ~ bootstrap ~ configService.get('PORT'):",
    configService.get('PORT'),
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();

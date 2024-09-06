import { NestFactory } from "@nestjs/core";
import { LogModule } from "./log.module";
import { ConfigService } from "@nestjs/config";
import { RmqService } from "libs/common";
import { RmqOptions } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(LogModule);
    const configService = app.get(ConfigService);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice<RmqOptions>(rmqService.getOptions("LOG", true));
    app.startAllMicroservices();

    await app.listen(configService.get("apps.log.port"));
    console.log(
        `Log Application is running on: ${await app.getUrl()} port: ${configService.get("apps.log.port")}`
    );
}
bootstrap();

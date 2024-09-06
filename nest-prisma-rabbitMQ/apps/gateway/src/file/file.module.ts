import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
// import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        MulterModule.register({
            // 用于配置上传，这部分也可以写在路由上
            storage: diskStorage({
                destination: join(__dirname, "..", "public/upload"),
                filename: (_, file, callback) => {
                    const fileName = `${new Date().getTime() + extname(file.originalname)}`;
                    return callback(null, fileName);
                },
            }),
        }),
        // ServeStaticModule.forRoot({
        //   rootPath: join(__dirname, '../..', 'images'),
        //   serveRoot: '/static',
        // }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}

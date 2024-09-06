import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    Res,
    StreamableFile,
    HttpException,
    HttpStatus,
    Next,
    Query,
    ParseFilePipe,
    MaxFileSizeValidator,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, stat } from "fs";
import { join } from "path";
import { promisify } from "util";
import { promises as fs } from "fs";
import { Response, NextFunction } from "express";

@Controller("/api/file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    // @ApiConsumes('multipart/form-data')
    // new ParseFilePipe({
    //   validators: [new MaxFileSizeValidator({ maxSize: 1000 })],
    // }),
    uploadFile(
        @Body() body: CreateFileDto,
        @UploadedFile()
        file: Express.Multer.File
    ) {
        return {
            file,
            url: `/public/upload/${file.filename}`,
        };
    }

    /**
     * 直接下载文件接口
     * @param res
     * @param filename
     * @param next
     * @returns
     */
    @Get("download")
    async downloadFile(
        @Res() res: Response,
        @Query("filename") filename: string = "test4.MP4",
        @Next() next: NextFunction
    ) {
        const filePath = join(
            process.cwd(),
            "/dist/apps/public/upload",
            filename
        );
        const fileExists = await fs
            .access(filePath)
            .then(() => true)
            .catch(() =>
                next(new HttpException("File not found", HttpStatus.NOT_FOUND))
            );
        if (!fileExists) {
            return next(
                new HttpException("File not found", HttpStatus.NOT_FOUND)
            );
        }

        try {
            res.download(filePath, (err) => {
                if (err) {
                    console.error("Download failed:", err);
                    // 使用 next() 将错误传递给全局过滤器
                    next(
                        new HttpException(
                            "Error downloading file",
                            HttpStatus.INTERNAL_SERVER_ERROR
                        )
                    );
                } else {
                    console.log("File downloaded successfully");
                    // next();
                }
            });
        } catch (error) {
            next(
                new HttpException(
                    "Error downloading file",
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            );
        }
    }

    /**
     * 下载文件流接口
     * 无法下载视频，视频下载使用下面接口 因为没有Content-Length数据
     * @param res
     * @param filename 文件名
     * @param next
     * @returns
     */
    @Get("download/stream")
    async downloadFileStream(
        @Res() res: Response,
        @Query("filename") filename: string = "test4.MP4",
        @Next() next: NextFunction
    ) {
        const filePath = join(
            process.cwd(),
            "/dist/apps/public/upload",
            filename
        );
        const fileExists = await fs
            .access(filePath)
            .then(() => true)
            .catch(() =>
                next(new HttpException("File not found", HttpStatus.NOT_FOUND))
            );
        if (!fileExists) {
            return next(
                new HttpException("File not found", HttpStatus.NOT_FOUND)
            );
        }
        // 设置响应头
        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${filename}"`,
        });

        const readerStream = createReadStream(filePath);
        readerStream.on("data", (chunk) => {
            res.write(chunk, "binary");
        });
        readerStream.on("end", () => {
            res.end();
        });
        readerStream.on("error", () => {
            next(
                new HttpException(
                    "下载失败，请重试",
                    HttpStatus.SERVICE_UNAVAILABLE
                )
            );
        });
    }

    /**
     * 下载视频流接口
     * 设置文件大小 Content-Length 不然无法下载视频
     * @param res
     * @param filename
     * @param next
     * @returns
     */
    @Get("download/videoStream")
    async downloadBigFile(
        @Res() res: Response,
        @Query("filename") filename: string,
        @Next() next: NextFunction
    ) {
        const filePath = join(
            process.cwd(),
            "/dist/apps/public/upload",
            filename
        );

        // 获取视频下载方法文件信息
        stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                return next(
                    new HttpException(
                        "文件不存在或无法访问",
                        HttpStatus.NOT_FOUND
                    )
                );
            }

            // 设置响应头
            res.set({
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": stats.size, // 设置文件大小
            });

            // 创建文件读取流
            const readerStream = createReadStream(filePath);

            // 处理数据流
            readerStream.on("open", () => {
                readerStream.pipe(res); // 将流数据直接传递给响应
            });

            // 流结束
            readerStream.on("end", () => {
                res.end();
            });

            // 错误处理
            readerStream.on("error", (streamErr) => {
                console.error("Stream error:", streamErr);
                return next(
                    new HttpException(
                        "下载失败，请重试",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                );
            });
        });
    }

    @Post()
    create(@Body() createFileDto: CreateFileDto) {
        return this.fileService.create(createFileDto);
    }

    @Get()
    findAll() {
        return this.fileService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.fileService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
        return this.fileService.update(+id, updateFileDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.fileService.remove(+id);
    }
}

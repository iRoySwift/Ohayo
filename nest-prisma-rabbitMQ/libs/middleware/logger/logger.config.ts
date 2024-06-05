import { IncomingMessage } from 'http';
import { Params } from 'nestjs-pino';
import pinoHttp, { ReqId } from 'pino-http';
import { getCorrelationId } from 'utils/get-correlation-id';
import { Request } from 'express';
import { join } from 'path';
import { MiddlewareConfigProxy } from '@nestjs/common/interfaces';

const passUrl = new Set(['/health', '/graphql']);

export const loggerOptions: any = {
  pinoHttp: [
    {
      base: null,
      quietReqLogger: true,
      genReqId: (request: Request) => getCorrelationId(request),
      ...(process.env.NODE_ENV === 'production'
        ? {
            target: 'pino-roll',
            options: {
              file: join(__dirname, './logs/logs.txt'),
              // 这个表示当前文件保存日志的周期，超过当前周期，保存在下一个文件
              frequency: 'daily',
              // 这个表示当前文件保存的大小，如果超过则保存在下一个文件中
              size: '10M',
              mkdir: true,
            },
          }
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: {
                sync: true,
                singleLine: true,
                colorize: true,
                colorizeObjects: true,
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
              },
            },
          }),
      autoLogging: {
        ignore: (req: IncomingMessage) =>
          passUrl.has((<Request>req).originalUrl),
      },
      customAttributeKeys: {
        req: '请求信息',
        res: '响应信息',
        err: '错误信息',
        responseTime: '响应时间(ms)',
      },
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      // serializers: {
      //   req(req: {
      //     httpVersion: any;
      //     raw: { httpVersion: any; params: any; query: any; body: any };
      //     params: any;
      //     query: any;
      //     body: any;
      //   }) {
      //     req.httpVersion = req.raw.httpVersion;
      //     req.params = req.raw.params;
      //     req.query = req.raw.query;
      //     req.body = req.raw.body;
      //     return req;
      //   },
      //   err(err: {
      //     params: any;
      //     raw: { params: any; query: any; body: any };
      //     query: any;
      //     body: any;
      //   }) {
      //     err.params = err.raw.params;
      //     err.query = err.raw.query;
      //     err.body = err.raw.body;
      //     return err;
      //   },
      // },
    },
    // multistream(
    //   [
    //     // https://getpino.io/#/docs/help?id=log-to-different-streams
    //     { level: 'debug', stream: process.stdout },
    //     { level: 'error', stream: process.stderr },
    //     { level: 'fatal', stream: process.stderr },
    //   ],
    //   { dedupe: true },
    // ),
  ],
};

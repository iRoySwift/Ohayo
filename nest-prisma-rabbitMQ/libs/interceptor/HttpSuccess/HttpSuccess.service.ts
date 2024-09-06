import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class HttpSuccessService implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => ({
                data, // data即为 Service层或者Controller层的返回值
                code: 200,
                message: "请求成功",
                success: true,
            }))
        );
    }
}

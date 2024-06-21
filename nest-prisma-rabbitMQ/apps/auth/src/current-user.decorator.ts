import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: any, content: ExecutionContext) => getCurrentUserByContext(content),
);

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order-request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Get('ids')
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('order/:id')
  async getOrdersById(@Param('id') id: string) {
    return this.ordersService.getOrdersById(id);
  }

  @Get('orderId')
  async getOrdersId(@Query() query) {
    return this.ordersService.getOrdersById(query.id);
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request);
  }
}

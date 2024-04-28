import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getHello(): string {
    return 'Hello World! orders2';
  }

  async createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request);
  }

  async getOrders() {
    return this.orderRepository.find({});
  }

  async getOrdersById(id: string) {
    return this.orderRepository.findOne({ _id: id });
  }
}

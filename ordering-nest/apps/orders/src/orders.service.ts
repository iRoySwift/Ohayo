import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrders() {
    return this.orderRepository.find({});
  }

  async getOrderById(id: string) {
    return this.orderRepository.findOne({ _id: id });
  }

  async createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request);
  }
}

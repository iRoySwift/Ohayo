import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrderRepository } from './order.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async getOrders() {
    return this.orderRepository.find({});
  }

  async getOrderById(id: string) {
    return this.orderRepository.findOne({ _id: id });
  }

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }
}

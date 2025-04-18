import { BaseService } from "./baseService.js";
import { OrderRepository } from "../repositories/orderRepository.js";
import { prisma } from "../config/bd.js";

export class OrderService extends BaseService {
  constructor() {
    super("Order");
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData) {
    return await prisma.$transaction(async (temporalTransaction) => {
      // 1. Descontar cantidad de bebidas
      for (const item of orderData.items) {
        const drink = await temporalTransaction.drink.findUnique({
          where: { id: item.drinkId },
        });
  
        if (!drink || drink.quantity < item.quantity) {
          throw new Error(`No hay suficiente cantidad para la bebida con ID ${item.drinkId}`);
        }
  
        await temporalTransaction.drink.update({
          where: { id: item.drinkId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        });
      }
  
      // 2. Crear la orden con sus items
      const newOrder = await temporalTransaction.order.create({
        data: {
          userId: orderData.userId,
          totalAmount: orderData.totalAmount,
          status: orderData.status || 'pending',
          orderItems: {
            create: orderData.items.map(item => ({
              drinkId: item.drinkId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: {
          orderItems: true
        }
      });
  
      return newOrder;
    });
  }

  async getUserOrders(userId) {
    return await this.orderRepository.getOrdersByUser(userId); 
  }

  async getAllOrders(){
    return await this.orderRepository.getAllOrders();
  }

  async getOrdersByStatus(status) {
    return await this.orderRepository.getOrdersByStatus(status);
  }
}

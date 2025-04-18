import { BaseRepository } from "./baseRepository.js";
import { prisma } from "../config/bd.js";

export class OrderRepository extends BaseRepository {
  constructor() {
    super("Order");
  }

  async createOrder(orderData) {
    return await prisma.order.create({
      data: {
        userId: orderData.userId,
        total: orderData.total,
        status: orderData.status || "pending",
        orderItems: {
          create: orderData.items.map((item) => ({
            drinkId: item.drinkId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        totalAmount: orderData.totalAmount,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async getOrdersByUser(userId) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            drink: true,
          },
        },
      },
    });
  }

  async getOrdersByStatus(status) {
    return await prisma.order.findMany({
      where: { status },
      include: {
        orderItems: {
          include: {
            drink: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            drink: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

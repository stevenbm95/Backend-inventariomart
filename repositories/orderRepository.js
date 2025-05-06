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

  async getOrderWithItems(orderId) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: { drink: true },
        },
      },
    });
  }

  async updateOrderStatus(orderId, status, tx = prisma) {
    return await tx.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async incrementDrinkStock(drinkId, quantity, tx = prisma) {
    return await tx.drink.update({
      where: { id: drinkId },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  // Actualizar la cantidad de un ítem en una orden
async updateOrderItemQuantity(orderItemId, newQuantity, tx = prisma) {
  return await tx.orderItem.update({
    where: { id: orderItemId },
    data: { quantity: newQuantity },
  });
}

// Eliminar un ítem de una orden
async deleteOrderItem(orderItemId, tx = prisma) {
  return await tx.orderItem.delete({
    where: { id: orderItemId },
  });
}

// Obtener un ítem de orden por ID con su bebida y orden asociada
async getOrderItemById(orderItemId, tx = prisma) {
  return await tx.orderItem.findUnique({
    where: { id: orderItemId },
    include: {
      drink: true,
      order: true,
    },
  });
}

}

import { BaseService } from "./baseService.js";
import { OrderRepository } from "../repositories/orderRepository.js";
import { prisma } from "../config/bd.js";

export class OrderService extends BaseService {
  constructor() {
    super("Order");
    this.orderRepository = new OrderRepository();
  }

  // Función para descontar el stock de las bebidas
  async decrementDrinkStock(drinkId, quantity, tx) {
    const drink = await tx.drink.findUnique({
      where: { id: drinkId },
    });

    if (!drink || drink.stock < quantity) {
      throw new Error(`No hay suficiente cantidad para la bebida con ID ${drinkId}`);
    }

    await tx.drink.update({
      where: { id: drinkId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  // Función para crear la orden
  async createOrder(orderData) {
    return await prisma.$transaction(async (temporalTransaction) => {
      // 1. Descontar cantidad de bebidas de manera transaccional
      for (const item of orderData.items) {
        await this.decrementDrinkStock(item.drinkId, item.quantity, temporalTransaction);
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
              price: item.price,
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });

      return newOrder;
    });
  }

  // Obtener las órdenes de un usuario
  async getUserOrders(userId) {
    return await this.orderRepository.getOrdersByUser(userId); 
  }

  // Obtener todas las órdenes
  async getAllOrders() {
    return await this.orderRepository.getAllOrders();
  }

  // Obtener órdenes por estatus
  async getOrdersByStatus(status) {
    return await this.orderRepository.getOrdersByStatus(status);
  }

  // Función para cancelar una orden y devolver las bebidas al stock
  async cancelOrder(orderId) {
    return await prisma.$transaction(async (temporalTransaction) => {
      const order = await temporalTransaction.order.findUnique({
        where: { id: orderId },
        include: {
          orderItems: true,
        },
      });

      if (!order) throw new Error("Orden no encontrada");

      // 1. Devolver las bebidas al stock
      for (const item of order.orderItems) {
        await temporalTransaction.drink.update({
          where: { id: item.drinkId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // 2. Cambiar el estado de la orden a 'cancelled'
      await temporalTransaction.order.update({
        where: { id: orderId },
        data: {
          status: 'cancelled',
        },
      });

      return { success: true };
    });
  }

  async updateOrderItemQuantity(orderItemId, newQuantity) {
    return await prisma.$transaction(async (tx) => {
      const orderItem = await tx.orderItem.findUnique({
        where: { id: orderItemId },
        include: {
          drink: true,
          order: true,
        },
      });
  
      if (!orderItem) throw new Error("Item no encontrado");
      console.log(orderItem.order.status


        
      )
      if (orderItem.order.status !== 'pending') {
        throw new Error("Solo se pueden editar órdenes pendientes");
      }
  
      const diff = newQuantity - orderItem.quantity;
  
      // Si hay diferencia, ajustamos el stock
      if (diff > 0) {
        // Aumentó la cantidad → debemos verificar si hay suficiente stock
        if (orderItem.drink.stock < diff) {
          throw new Error("No hay suficiente stock para esta bebida");
        }
  
        await tx.drink.update({
          where: { id: orderItem.drinkId },
          data: {
            stock: {
              decrement: diff,
            },
          },
        });
      } else if (diff < 0) {
        // Disminuyó la cantidad → devolver al stock
        await tx.drink.update({
          where: { id: orderItem.drinkId },
          data: {
            stock: {
              increment: Math.abs(diff),
            },
          },
        });
      }
  
      // Actualizamos el item con la nueva cantidad
      const updatedItem = await tx.orderItem.update({
        where: { id: orderItemId },
        data: {
          quantity: newQuantity,
        },
      });
  
      return updatedItem;
    });
  }

  async deleteOrderItem(orderItemId) {
    return await prisma.$transaction(async (tx) => {
      const item = await tx.orderItem.findUnique({
        where: { id: orderItemId },
        include: { drink: true, order: true },
      });
  
      if (!item) throw new Error("Item no encontrado");
      if (item.order.status !== 'pending') {
        throw new Error("Solo se pueden eliminar ítems de órdenes pendientes");
      }
  
      // Devolver stock
      await tx.drink.update({
        where: { id: item.drinkId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
  
      // Eliminar el ítem
      await tx.orderItem.delete({
        where: { id: orderItemId },
      });
  
      return { success: true };
    });
  }
  
}

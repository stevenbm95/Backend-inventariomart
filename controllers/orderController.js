import { OrderService } from "../services/orderService.js";

export class OrderController {
  constructor(service = new OrderService()) {
    this.orderService = service;
  }

  getOrders = async (req, res, next) => {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  getOrderById = async (req, res, next) => {
    try {
      const order = await this.orderService.getById(req.params.id);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  createOrder = async (req, res, next) => {    
    try {
      const order = await this.orderService.createOrder(req.body);
      return res.status(201).json({ message: "order created successfully", order });
    } catch (error) {
      next(error);
    }
  }

  deleteOrder = async (req, res, next) => {
    try {
      const order = await this.orderService.deleteById(req.params.id);
      return res.status(200).json({ message: "order deleted successfully", order });
    } catch (error) {
      next(error);
    }
  }

  updateOrder = async (req, res, next) => {
    try {
      const order = await this.orderService.update(req.params.id, req.body);
      return res.status(200).json({ message: "order updated successfully", order });
    } catch (error) {
      next(error);
    }
  }

  getOrdersByStatus = async (req, res, next) => {
    try {
      const orders = await this.orderService.getOrdersByStatus(req.params.status);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  cancelOrder = async (req, res, next) => {
    try {
      const result = await this.orderService.cancelOrder(req.params.id);
      return res.status(200).json({ message: "order cancelled successfully", result });
    } catch (error) {
      next(error);
    }
  }

  getUserOrders = async (req, res, next) => {
    try {
      const orders = await this.orderService.getUserOrders(req.params.userId);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  updateOrderItem = async (req, res, next) => {
    try {
      const orderItemId = Number(req.params.id);
      const { quantity } = req.body;
      
      // Verificar que la cantidad sea válida
      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Cantidad inválida" });
      }
  
      // Actualizar el item y obtener la orden completa actualizada
      const updatedOrder = await this.orderService.updateOrderItemQuantity(
        orderItemId, 
        quantity
      );
      
      res.json({updatedOrder, message: "Cantidad actualizada"});
    } catch (error) {
      next(error);
    }
  }
  
  // DELETE /order-item/:id
  deleteOrderItem = async (req, res, next) => {
    try {
      const orderItemId = Number(req.params.id);
      await this.orderService.deleteOrderItem(orderItemId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
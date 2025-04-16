import { OrderService } from "../services/orderService.js";

export class OrderController {
  constructor(service = new OrderService()) {
    this.orderService = service;
  }

  getOrders = async (req, res, next) => {
    try {
      const orders = await this.orderService.getAll();
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
}
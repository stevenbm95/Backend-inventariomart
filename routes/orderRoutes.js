import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { orderSchema, idSchema } from "../validations/index.js";
import { OrderController } from "../controllers/orderController.js";

const router = Router();
const orderController = new OrderController();

router.post("/", validateRequest(orderSchema), orderController.createOrder);                 // POST /orders
router.get("/", orderController.getOrders);                                                 // GET /orders
router.get("/:id", validateId(idSchema), orderController.getOrderById);                     // GET /orders/:id
router.delete("/:id", validateId(idSchema), orderController.deleteOrder);                   // DELETE /orders/:id
router.put("/:id", validateId(idSchema), orderController.updateOrder);                      // PUT /orders/:id
router.get("/status/:status", orderController.getOrdersByStatus);                           // GET /orders/status/:status
router.get("/user/:userId", orderController.getUserOrders);                                 // GET /orders/user/:userId
router.patch("/:id/cancel", validateId(idSchema), orderController.cancelOrder);             // PATCH /orders/:id/cancel
router.patch("/item/:id", orderController.updateOrderItem);
router.delete("/item/:id", orderController.deleteOrderItem);



export default router;
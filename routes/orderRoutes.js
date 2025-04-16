
import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { orderSchema, idSchema } from "../validations/index.js";
import { OrderController } from "../controllers/orderController.js";

const router = Router();
const orderController = new OrderController();

router.post("/create-order", validateRequest(orderSchema), orderController.createOrder);
router.get("/get-orders", orderController.getOrders);
router.get("/get-order/:id", validateId(idSchema), orderController.getOrderById)
router.delete("/delete-order/:id", validateId(idSchema), orderController.deleteOrder)

export default router;
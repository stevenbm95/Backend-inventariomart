import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { inventoryChangeSchema, idSchema } from "../validations/index.js";
import { InventoryController } from "../controllers/inventoryController.js";

const router = Router();
const inventoryController = new InventoryController();

router.post("/create-inventory", validateRequest(inventoryChangeSchema), inventoryController.createChange);
router.get("/get-inventorys", inventoryController.getChanges);
router.get("/get-inventory/:id", validateId(idSchema), inventoryController.getChangeById)
router.put("/update-inventory/:id", validateId(idSchema), validateRequest(inventoryChangeSchema), inventoryController.updateChange)
router.delete("/delete-inventory/:id", validateId(idSchema), inventoryController.deleteChange)

export default router;

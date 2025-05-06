import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { inventoryChangeSchema, idSchema } from "../validations/index.js";
import { InventoryController } from "../controllers/inventoryController.js";

const router = Router();
const inventoryController = new InventoryController();

router.post("/", validateRequest(inventoryChangeSchema), inventoryController.createChange);
router.get("/", inventoryController.getChanges);
router.get("/:id", validateId(idSchema), inventoryController.getChangeById)
router.put("/:id", validateId(idSchema), validateRequest(inventoryChangeSchema), inventoryController.updateChange)
router.delete("/:id", validateId(idSchema), inventoryController.deleteChange)

export default router;

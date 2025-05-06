import { Router } from "express";
import { RoleController } from "../controllers/roleController.js";
import { validateRequest, validateId } from "../middlewares/index.js";
import { roleSchema, idSchema } from "../validations/index.js";

const router = Router();
const rolController = new RoleController();

router.get("/", rolController.getRols)
router.post("/", validateRequest(roleSchema), rolController.createRol)
router.get("/:id", validateId(idSchema), rolController.getRolById)
router.put("/:id",validateId(idSchema), validateRequest(roleSchema), rolController.updateRol)
router.delete("/:id",validateId(idSchema), rolController.deleteRol)

export default router;

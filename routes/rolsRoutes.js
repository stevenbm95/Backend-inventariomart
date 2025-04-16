import { Router } from "express";
import { RoleController } from "../controllers/roleController.js";
import { validateRequest, validateId } from "../middlewares/index.js";
import { roleSchema, idSchema } from "../validations/index.js";

const router = Router();
const rolController = new RoleController();

router.get("/get-rols", rolController.getRols)
router.post("/create-rol", validateRequest(roleSchema), rolController.createRol)
router.get("/get-rol/:id", validateId(idSchema), rolController.getRolById)
router.put("/update-rol/:id",validateId(idSchema), validateRequest(roleSchema), rolController.updateRol)
router.delete("/delete-rol/:id",validateId(idSchema), rolController.deleteRol)

export default router;

import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { userSchema, idSchema } from "../validations/index.js";
import { UserController } from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router.post("/", validateRequest(userSchema), userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", validateId(idSchema), userController.getUserById)
router.put("/:id", validateId(idSchema), validateRequest(userSchema), userController.updateUser)
router.delete("/:id", validateId(idSchema), userController.deleteUser)

export default router;

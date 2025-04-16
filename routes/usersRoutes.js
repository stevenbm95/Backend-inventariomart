import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { userSchema, idSchema } from "../validations/index.js";
import { UserController } from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router.post("/create-user", validateRequest(userSchema), userController.createUser);
router.get("/get-users", userController.getUsers);
router.get("/get-user/:id", validateId(idSchema), userController.getUserById)
router.put("/update-user/:id", validateId(idSchema), validateRequest(userSchema), userController.updateUser)
router.delete("/delete-user/:id", validateId(idSchema), userController.deleteUser)

export default router;

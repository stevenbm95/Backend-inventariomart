import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.get("/get-user/:id", authController.getUser);
// router.get("/get-users", authController.getUsers);
// router.get("/get-user-by-role/:id", authController.getUserByRole);

export default router;
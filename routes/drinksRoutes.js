import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { drinkSchema, idSchema } from "../validations/index.js";
import { DrinkController } from "../controllers/drinkController.js";

const router = Router();
const drinkController = new DrinkController();

router.post("/", validateRequest(drinkSchema), drinkController.createDrink);
router.get("/", drinkController.getDrinks);
router.get("/:id", validateId(idSchema), drinkController.getDrinkById)
router.put("/:id", validateId(idSchema), validateRequest(drinkSchema), drinkController.updateDrink)
router.delete("/:id", validateId(idSchema), drinkController.deleteDrink)

export default router;

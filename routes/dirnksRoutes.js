import { Router } from "express";
import { validateId, validateRequest } from "../middlewares/index.js";
import { drinkSchema, idSchema } from "../validations/index.js";
import { DrinkController } from "../controllers/dirnkController.js";

const router = Router();
const drinkController = new DrinkController();

router.post("/create-drink", validateRequest(drinkSchema), drinkController.createDrink);
router.get("/get-drinks", drinkController.getDrinks);
router.get("/get-drink/:id", validateId(idSchema), drinkController.getDrinkById)
router.put("/update-drink/:id", validateId(idSchema), validateRequest(drinkSchema), drinkController.updateDrink)
router.delete("/delete-drink/:id", validateId(idSchema), drinkController.deleteDrink)

export default router;

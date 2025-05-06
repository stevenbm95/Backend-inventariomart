import { Router } from "express";
import rolsRoutes from "./rolsRoutes.js";
import usersRoutes from "./usersRoutes.js";
import authRoutes from "./authRoutes.js";
import drinksRoutes from "./drinksRoutes.js";
// import consumptionsRoutes from "./consumptionsRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
import orderRoutes from "./orderRoutes.js"

const router = Router();

router.use('/rols', rolsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/drinks', drinksRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes )


export default router;
import { Router } from "express";
import { getProductsActive } from "../controllers/productsActive.controller";


const router= Router();

router.get("/",/*extractUserMiddlewares, */getProductsActive/*, GetSuppliesMiddleware*/);

export default router;
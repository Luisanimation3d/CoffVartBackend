import { Router } from "express";
import { getSuppliersActive } from "../controllers/suppliersActive.controller";


const router= Router();

router.get("/",/*extractUserMiddlewares, */getSuppliersActive/*, GetSuppliesMiddleware*/);

export default router;
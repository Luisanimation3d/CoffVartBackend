import { Router } from "express";
import { getCompanysActive } from "../controllers/companysActive.controller";


const router= Router();

router.get("/",/*extractUserMiddlewares, */getCompanysActive/*, GetSuppliesMiddleware*/);

export default router;
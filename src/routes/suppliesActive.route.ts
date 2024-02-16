import { Router } from "express";
import { getSuppliesActive } from "../controllers/suppliesActive.controller";


const router= Router();

router.get("/",/*extractUserMiddlewares, */getSuppliesActive/*, GetSuppliesMiddleware*/);
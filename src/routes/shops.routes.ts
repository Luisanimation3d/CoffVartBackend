import { Router } from "express";
import { getShops } from "../controllers/shop.controller";

const router= Router();

router.get("/",getShops);


export default router;
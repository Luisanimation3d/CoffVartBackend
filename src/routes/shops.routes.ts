import { Router } from "express";
import { getShops } from "../controllers/shop.controller";
import {validateRoutePost} from '../middlewares/shops.middlewares';
import { postShop } from "../controllers/shop.controller";


const router= Router();

router.get("/",getShops);
router.get("/:id",getShops);
router.post("/",validateRoutePost, postShop);


export default router;
import { Router } from "express";
import { deleteShop, getShop, getShops } from "../controllers/shop.controller";
import {validateRoutePost} from '../middlewares/shops.middlewares';
import { postShop } from "../controllers/shop.controller";
import { GetShopsMiddleware, PostShopsMiddleware } from "../middlewares/shops.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";


const router= Router();

router.get("/",/*extractUserMiddlewares,GetShopsMiddleware,*/getShop);
router.get("/:id",getShops);
router.post("/",/*extractUserMiddlewares,PostShopsMiddleware,validateRoutePost,*/ postShop);
router.delete('/:id', deleteShop);


export default router;
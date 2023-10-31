import { Router } from "express";
import { getShops } from "../controllers/shop.controller";
import {validateRoutePost} from '../middlewares/shops.middlewares';
import { postShops } from "../controllers/shop.controller";
import { GetShopsMiddleware, PostShopsMiddleware } from "../middlewares/users.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";


const router= Router();

router.get("/",extractUserMiddlewares,GetShopsMiddleware,getShops);
router.get("/:id",getShops);
router.post("/",extractUserMiddlewares,PostShopsMiddleware,validateRoutePost, postShops);


export default router;
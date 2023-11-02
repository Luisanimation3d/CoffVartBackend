import { Router } from "express";
import { getProductionOrders,deleteProductionOrder, getProductionOrder, postProducionOrder, putProductionOrder } from "../controllers/productionOrders.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/productionOrders.middleware";


const router= Router();

router.get("/",extractUserMiddlewares,getProductionOrders);
router.get('/:id',extractUserMiddlewares,validateRouteGet,getProductionOrder)
router.post("/",extractUserMiddlewares,validateRoutePost,postProducionOrder);
router.put("/:id",extractUserMiddlewares,validateRoutePut,putProductionOrder);
router.delete("/:id",extractUserMiddlewares,validateRouteDelete,deleteProductionOrder);

export default router;
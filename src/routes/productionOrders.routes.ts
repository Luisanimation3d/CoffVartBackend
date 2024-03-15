import { Router } from "express";
import { getProductionOrders,deleteProductionOrder, getProductionOrder,postProductionOrder, putProductionOrder, postProductionOrderDetail } from "../controllers/productionOrders.controller";
// import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/productionOrders.middleware";


const router= Router();

router.get("/",/*extractUserMiddlewares,*/getProductionOrders);
router.get('/:id',/*extractUserMiddlewaresvalidateRouteGet */ getProductionOrder)
router.post("/",/*extractUserMiddlewaresvalidateRoutePost */postProductionOrder);
router.put("/:id",/*extractUserMiddlewaresvalidateRoutePut */ putProductionOrder);
router.delete("/:id",/*extractUserMiddlewaresvalidateRouteDelete */ deleteProductionOrder);
router.post("/detail",postProductionOrderDetail);

export default router;

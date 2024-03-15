import { Router } from "express";
import { getProductionRequests,deleteProductionRequest, getProductionRequest, postProductionRequest, putProductionRequest } from "../controllers/productionRequests.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/productionRequests.middleware";


const router= Router();

router.get("/",/*extractUserMiddlewares,*/getProductionRequests);
router.get('/:id',/*extractUserMiddlewaresvalidateRouteGet*/getProductionRequest)
router.post("/",/*extractUserMiddlewaresvalidateRoutePost */postProductionRequest);
router.put("/:id",/*extractUserMiddlewares validateRoutePut */putProductionRequest);
router.delete("/:id",/*extractUserMiddlewares validateRouteDelete */deleteProductionRequest);

export default router;
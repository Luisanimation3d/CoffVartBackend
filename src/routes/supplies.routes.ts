import { Router } from "express";
import { getSupplies, getSupply, postSupplies, putSupplies, deleteSupplies } from "../controllers/supplies.controller";
import { validateRoutePost } from "../middlewares/supplies.middlewares";
import { GetSuppliesMiddleware, PostSuppliesMiddleware, PutSuppliesMiddleware } from "../middlewares/supplies.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router= Router();

router.get("/",/*extractUserMiddlewares, */getSupplies/*, GetSuppliesMiddleware*/);
router.get("/:id",getSupply);
router.post("/",/*extractUserMiddlewares,*/ postSupplies/*, validateRoutePost, PostSuppliesMiddleware*/);
router.put("/:id",/*extractUserMiddlewares, */putSupplies/*, PutSuppliesMiddleware*/);
router.delete("/:id",deleteSupplies);

export default router;
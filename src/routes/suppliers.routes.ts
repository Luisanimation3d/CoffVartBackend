import { Router } from "express";
import { getSupplier,getSuppliers, postSuppliers,putSuppliers,deleteSuppliers } from "../controllers/suppliers.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/suppliers.middleware";

const router= Router();

router.get("/",/*extractUserMiddlewares,*/getSuppliers);
router.get('/:id', /*extractUserMiddlewares, validateRouteGet,*/ getSupplier)
router.post("/",/*extractUserMiddlewares,validateRoutePost,*/postSuppliers);
router.put("/:id",/*extractUserMiddlewares,validateRoutePut,*/putSuppliers);
router.delete("/:id",/*extractUserMiddlewares,validateRouteDelete,*/deleteSuppliers);

export default router;
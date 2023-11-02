import { Router } from "express";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/products.controller";
import { validateRoutePost } from "../middlewares/products.middlewares";
import { GetProductsMiddleware, PostProudctsMiddleware, PutProductsMiddleware } from "../middlewares/users.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router= Router();

router.get("/", /*extractUserMiddlewares*/ getProducts,  GetProductsMiddleware);
router.get("/:id",getProducts); 
router.post("/",/*extractUserMiddlewares*/ postProducts, validateRoutePost,  /*PostProudctsMiddleware*/);
router.put("/:id",/*extractUserMiddlewares*/ putProducts, PutProductsMiddleware);
router.delete("/:id",deleteProducts);

export default router;
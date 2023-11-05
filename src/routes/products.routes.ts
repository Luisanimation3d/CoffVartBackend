import { Router } from "express";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/products.controller";
import { validateRoutePost } from "../middlewares/products.middlewares";
import { GetProductsMiddleware, PostProductsMiddleware, PutProductsMiddleware } from "../middlewares/products.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router= Router();

router.get("/", /*extractUserMiddlewares*/ getProducts,  GetProductsMiddleware);
router.get("/:id",getProducts); 
router.post("/", /*extractUserMiddlewares*/ postProducts, validateRoutePost,  /*PostProductsMiddleware*/);
router.put("/:id",extractUserMiddlewares, putProducts, PutProductsMiddleware);
router.delete("/:id",deleteProducts);

export default router;
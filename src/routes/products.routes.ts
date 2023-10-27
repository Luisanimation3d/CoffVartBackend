import { Router } from "express";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/products.controller";
import { validateRoutePost } from "../middlewares/products.middlewares";

const router= Router();

router.get("/",getProducts);
router.post("/",postProducts, validateRoutePost);
router.put("/:id",putProducts);
router.delete("/:id",deleteProducts);

export default router;
import { Router } from "express";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/products.controller";

const router= Router();

router.get("/",getProducts);
router.post("/",postProducts);
router.put("/:id",putProducts);
router.delete("/:id",deleteProducts);

export default router;
import { Router } from "express";
import { deleteProductionOrder, getProductionOrder, postProducionOrder, putProductionOrder } from "../controllers/productionOrders.controller";
const router= Router();

router.get("/",getProductionOrder);
router.post("/",postProducionOrder);
router.put("/:id",putProductionOrder);
router.delete("/:id",deleteProductionOrder);

export default router;
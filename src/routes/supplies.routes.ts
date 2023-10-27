import { Router } from "express";
import { getSupplies, postSupplies, putSupplies, deleteSupplies } from "../controllers/supplies.controller";
import { validateRoutePost } from "../middlewares/supplies.middlewares";

const router= Router();

router.get("/",getSupplies);
router.post("/",postSupplies, validateRoutePost);
router.put("/:id",putSupplies);
router.delete("/:id",deleteSupplies);

export default router;
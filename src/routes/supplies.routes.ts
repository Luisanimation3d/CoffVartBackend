import { Router } from "express";
import { getSupplies, postSupplies, putSupplies, deleteSupplies } from "../controllers/supplies.controller";

const router= Router();

router.get("/",getSupplies);
router.post("/",postSupplies);
router.put("/:id",putSupplies);
router.delete("/:id",deleteSupplies);

export default router;
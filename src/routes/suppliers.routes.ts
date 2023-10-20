import { Router } from "express";
import { getSuppliers, postSuppliers,putSuppliers,deleteSuppliers } from "../controllers/suppliers.controller";

const router= Router();

router.get("/",getSuppliers);
router.post("/",postSuppliers);
router.put("/:id",putSuppliers);
router.delete("/:id",deleteSuppliers);

export default router;
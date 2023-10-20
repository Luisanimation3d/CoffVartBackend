import { Router } from "express";
import { getCompanys,postCompanys,putCompanys,deleteCompanys } from "../controllers/companys.controller";

const router= Router();

router.get("/",getCompanys);
router.post("/",postCompanys);
router.put("/:id",putCompanys);
router.delete("/:id",deleteCompanys);

export default router;
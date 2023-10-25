import { Router } from "express";
import { getShops, postShops, putShops, deleteShops } from "../controllers/shops.controller";

const router= Router();

router.get("/",getShops);
router.post("/",postShops);
router.put("/:id",putShops);
router.delete("/:id",deleteShops);

export default router;
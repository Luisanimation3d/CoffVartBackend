import { Router } from "express";
import { getCoustomersActive } from "../controllers/coustomersActive";

const router = Router();

router.get("/", getCoustomersActive);

export default router;
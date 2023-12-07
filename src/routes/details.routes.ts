import { Router } from "express";
import { getDetails } from "../controllers/shopdetails.controller";

const router = Router();


router.get("/", getDetails);

export default router;
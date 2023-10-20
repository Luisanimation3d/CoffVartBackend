import {Router } from "express";
import { getCoustumers } from "../controllers/coustomers.controller";

const router = Router();

router.get('/', getCoustumers);

export default router;
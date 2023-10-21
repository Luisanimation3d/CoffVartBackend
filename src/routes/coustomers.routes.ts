import {Router } from "express";
import { getCoustumers, postCoustumers} from "../controllers/coustomers.controller";

const router = Router();

router.get('/', getCoustumers);
router.post('/', postCoustumers);

export default router;
import {Router } from "express";
import { getCoustumers, postCoustumers, putCoustumers, deleteCoustumers} from "../controllers/coustomers.controller";

const router = Router();

router.get('/', getCoustumers);
router.post('/', postCoustumers);
router.put('/:id', putCoustumers);
router.delete('/:id', deleteCoustumers);

export default router;
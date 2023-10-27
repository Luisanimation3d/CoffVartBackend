import {Router } from "express";
import { getCoustumers, postCoustumers, putCoustumers, deleteCoustumers} from "../controllers/coustomers.controller";
import { validateRoutePost } from "../middlewares/coustumers.middleware";
const router = Router();

router.get('/', getCoustumers);
router.post('/', validateRoutePost, postCoustumers);
router.put('/:id', putCoustumers);
router.delete('/:id', deleteCoustumers);

export default router;
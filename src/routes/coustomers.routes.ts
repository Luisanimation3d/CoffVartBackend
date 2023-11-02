import {Router } from "express";
import { getCoustumers, postCoustumers, putCoustumers, deleteCoustumers} from "../controllers/coustomers.controller";
import { validateRoutePost , validateRoutePut} from "../middlewares/coustumers.middleware";
import { GetCoustumersMiddleware, PostCoustumersMiddleware, PutCoustumersMiddleware, DeleteCoustumersMiddleware } from "../middlewares/users.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
const router = Router();

router.get('/', extractUserMiddlewares, GetCoustumersMiddleware, getCoustumers);
router.post('/', extractUserMiddlewares, PostCoustumersMiddleware, validateRoutePost, postCoustumers);
router.put('/:id',  extractUserMiddlewares, PutCoustumersMiddleware, validateRoutePut, putCoustumers);
router.delete('/:id', extractUserMiddlewares, DeleteCoustumersMiddleware, deleteCoustumers);

export default router;
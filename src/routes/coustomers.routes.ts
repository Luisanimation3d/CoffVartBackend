import {Router } from "express";
import { getCoustumers, getCoustumer, postCoustumers, putCoustumers, deleteCoustumers} from "../controllers/coustomers.controller";
import { validateRoutePost , validateRoutePut} from "../middlewares/coustumers.middleware";
import { GetCoustumersMiddleware, PostCoustumersMiddleware, PutCoustumersMiddleware, DeleteCoustumersMiddleware } from "../middlewares/coustumers.middleware";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
const router = Router();
router.get('/:id', /*extractUserMiddlewares*/ getCoustumer);
router.get('/', /*extractUserMiddlewares*/  /*GetCoustumersMiddleware*/ getCoustumers);
router.post('/', /*extractUserMiddlewares*/ /*PostCoustumersMiddleware*/ /*validateRoutePost,*/ postCoustumers);
router.put('/:id',  /*extractUserMiddlewares*/ /*PutCoustumersMiddleware*/ /*validateRoutePut,*/ putCoustumers);
router.delete('/:id', /*extractUserMiddlewares*/ /*DeleteCoustumersMiddleware*/ deleteCoustumers);

export default router;
import { Router } from "express";
import { getOrders, getOrder, postOrder } from "../controllers/orders.controller";
import { PostOrdersMiddleware, GetOrdersMiddleware } from "../middlewares/orders.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import {validateRoutePost} from '../middlewares/orders.middlewares';

const router= Router()

router.get('/', /*extractUserMiddlewares, GetOrdersMiddleware,*/ getOrders);
router.get('/:id', getOrder);
router.post('/', /*extractUserMiddlewares, PostOrdersMiddleware, validateRoutePost,*/  postOrder);

export default router;
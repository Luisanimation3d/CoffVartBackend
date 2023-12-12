import { Router } from "express";
import { getOrders, getOrder, postOrder, putOrders, deleteOrders } from "../controllers/orders.controller";
import { PostOrdersMiddleware, GetOrdersMiddleware } from "../middlewares/orders.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import {validateRoutePost} from '../middlewares/orders.middlewares';

const router= Router()

router.get('/', /*extractUserMiddlewares, GetOrdersMiddleware,*/ getOrders);
router.get('/:id', getOrder);
router.post('/', /*extractUserMiddlewares, PostOrdersMiddleware, validateRoutePost,*/  postOrder);
router.put('/:id', putOrders);
router.delete('/:id', deleteOrders);

export default router;
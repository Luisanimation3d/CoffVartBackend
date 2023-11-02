import {Router} from 'express';
import {getSales, getSale, postSale} from '../controllers/sales.controller';
import {validateRoutePost} from '../middlewares/sales.middleware';
import { PostSalesMiddleware } from "../middlewares/users.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router = Router();

router.get('/', getSales);
router.get('/:id', getSale);
router.post('/',  extractUserMiddlewares, PostSalesMiddleware, validateRoutePost, postSale);

export default router;
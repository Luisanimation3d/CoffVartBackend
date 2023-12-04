import {Router} from 'express';
import {getSales, getSale, postSale, deleteSales} from '../controllers/sales.controller';
import {validateRoutePost} from '../middlewares/sales.middleware';
import { PostSalesMiddleware, GetSalesMiddleware } from "../middlewares/sales.middleware";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router = Router();

router.get('/', /*extractUserMiddlewares*/ /*GetSalesMiddleware*/ getSales);
router.get('/:id', getSale);
router.post('/',  /*extractUserMiddlewares*/  /*PostSalesMiddleware*/ /*validateRoutePost,*/ postSale);
router.delete('/', deleteSales)

export default router;
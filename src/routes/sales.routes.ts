import {Router} from 'express';
import {getSales, getSale, postSale} from '../controllers/sales.controller';
import {validateRoutePost} from '../middlewares/sales.middleware';
const router = Router();

router.get('/', getSales);
router.get('/:id', getSale);
router.post('/', validateRoutePost, postSale);

export default router;
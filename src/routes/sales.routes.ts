import {Router} from 'express';
import {getSales, getSale, postSale} from '../controllers/sales.controller';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSale);
router.post('/', postSale);

export default router;
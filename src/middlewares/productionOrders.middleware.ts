import { productionOrderModel } from "../models/productionOrders.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { expirationDate, initialWeight, process, orderState } = req.body;
    if (!expirationDate) {
        res.status(400).json({ error: 'production Order is required' });
        return;
    }
    if (expirationDate) {
        const productionOrderFound = await productionOrderModel.findOne({ where: { expirationDate} });
        if (productionOrderFound) {
            res.status(400).json({ error: 'production Order already exists' });
            return;
        }
    }

    if(!process){
        res.status(400).json({ error: 'process is required' });
        return;
    }
    if (!initialWeight) {
        res.status(400).json({ error: 'initial Weight is required' });
        return;
    }
    if (!orderState) {
        res.status(400).json({ error: 'order  state is required' });
        return;
    }
    next();
}

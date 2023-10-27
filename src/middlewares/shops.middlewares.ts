import { shopModel } from "../models/shops.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { invoice, state } = req.body;
    if (!invoice) {
        res.status(400).json({ error: 'invoice is required' });
        return;
    }
    if (invoice) {
        const shopFound = await shopModel.findOne({ where: { invoice } });
        if (shopFound) {
            res.status(400).json({ error: 'invoice already exists' });
            return;
        }
    }
    if(!state){
        res.status(400).json({ error: 'state is required' });
        return;
    }
    next();
}

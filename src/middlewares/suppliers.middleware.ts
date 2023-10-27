import { supplierModel } from "../models/suppliers.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, coffeType, address, phone, quality, unitCost } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const supplierFound = await supplierModel.findOne({ where: { name } });
        if (supplierFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }

    if(!coffeType){
        res.status(400).json({ error: 'coffeType is required' });
        return;
    }
    if (!address) {
        res.status(400).json({ error: 'address is required' });
        return;
    }
    if (!phone) {
        res.status(400).json({ error: 'phone is required' });
        return;
    }
    if (!quality) {
        res.status(400).json({ error: 'quality is required' });
        return;
    }
    if (!unitCost) {
        res.status(400).json({ error: 'unitCost is required' });
        return;
    }
    next();
}

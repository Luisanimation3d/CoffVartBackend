import { productModel } from "../models/products.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, amount, stockMin,stockMax,unitPrice,description } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const productFound = await productModel.findOne({ where: { name } });
        if (productFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }
    if(!amount){
        res.status(400).json({ error: 'amount is required' });
        return;
    }
    if(!amount.isNumeric){
        res.status(400).json({ error: 'amount must be numeric' });
        return;
    }
    if(!stockMin){
        res.status(400).json({ error: 'stockMin is required' });
        return;
    }
    if(!stockMin.isNumeric){
        res.status(400).json({ error: 'stockMin must be numeric' });
        return;
    }
    if(!stockMax){
        res.status(400).json({ error: 'stockMax is required' });
        return;
    }
    if(!stockMax.isNumeric){
        res.status(400).json({ error: 'stockMax must be numeric' });
        return;
    }
    if (!unitPrice) {
        res.status(400).json({ error: 'unitPrice is required' });
        return;
    }
    if(!unitPrice.isNumeric){
        res.status(400).json({ error: 'unitPrice must be numeric' });
        return;
    }
    if (!description) {
        res.status(400).json({ error: 'description is required' });
        return;
    }
    next();
}

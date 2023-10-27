import { coustumersModel } from "../models/coustomers.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, documentType, document, phone, email, address, state } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (document) {
        const coustumerFound = await coustumersModel.findOne({ where: { document } });
        if (coustumerFound) {
            res.status(400).json({ error: 'coustumer already exists' });
            return;
        }
    }

    if(!phone){
        res.status(400).json({ error: 'phone is required' });
        return;
    }
    if (!address) {
        res.status(400).json({ error: 'address is required' });
        return;
    }
    if (!email) {
        res.status(400).json({ error: 'email is required' });
        return;
    }
    if (!state) {
        res.status(400).json({ error: 'state is required' });
        return;
    }
    if (!documentType) {
        res.status(400).json({ error: 'documentType is required' });
        return;
    }
    if (!document) {
        res.status(400).json({ error: 'document is required' });
        return;
    }
    next();
}

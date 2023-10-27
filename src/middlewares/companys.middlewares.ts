import { companyModel } from "../models/companys.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, email, address, phone  } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const companyFound = await companyModel.findOne({ where: { name } });
        if (companyFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }
    if (!email) {
        res.status(400).json({ error: 'email is required' });
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
    next();
}

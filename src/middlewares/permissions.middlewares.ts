import { permissionsModel } from "../models/permissions.model";

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, description } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const permissionFound = await permissionsModel.findOne({ where: { name } });
        if (permissionFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }
    if (!description) {
        res.status(400).json({ error: 'description is required' });
        return;
    }
    next();
}

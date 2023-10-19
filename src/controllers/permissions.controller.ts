
import { Response, Request } from "express";
import { permissionsModel } from "../models/permissions.model";

export const getPermissions = async (req: Request, res: Response) => {
    const permissions = await permissionsModel.findAll();
    res.status(200).json({ permissions });
}

export const postPermission = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newPermission = await permissionsModel.create({ name, description });
    res.status(200).json({ newPermission });
}

export const putPermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const permission = await permissionsModel.findByPk(id);
    if (!permission) {
        return res.status(404).json({ msg: 'Permission not found' });
    }
    await permission.update({ name, description });
    res.status(200).json({ permission });
}

export const deletePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const permission = await permissionsModel.findByPk(id);
    if (!permission) {
        return res.status(404).json({ msg: 'Permission not found' });
    }
    await permission.destroy();
    res.status(200).json({ permission });
}
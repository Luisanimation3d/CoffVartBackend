import { Response, Request } from "express";
import { rolsModel } from "../models/rols.model";
import { rolDetailsModel } from "../models/rolDetails.model";

interface rolsType {
    rolModel: typeof rolsModel;
}

export const getRols = async (req: Request, res: Response) => {
    const rols = await rolsModel.findAll({
        include: [
            {
                model: rolDetailsModel,
                as: 'rolDetails'
            }
        ]
    });
    res.status(200).json({ rols });
}

export const getRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await rolsModel.findByPk(id, {
        include: [
            {
                model: rolDetailsModel,
                as: 'rolDetails'
            }
        ]
    });
    if (!rol) {
        return res.status(404).json({ msg: 'Rol not found' });
    }
    res.status(200).json({ rol });
}

export const postRol = async (req: Request, res: Response) => {
    const { name, description, permissions } = req.body;
    const newRol = await rolsModel.create({ name, description });
    permissions.forEach(async (permission: any) => {
        // await rolDetailsModel.create({ rolId: newRol.id, permissionId: permission });
    })
}

export const putRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const rol = await rolsModel.findByPk(id);
    if (!rol) {
        return res.status(404).json({ msg: 'Rol not found' });
    }
    await rol.update({ name, description });
    res.status(200).json({ rol });
}

export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await rolsModel.findByPk(id);
    if (!rol) {
        return res.status(404).json({ msg: 'Rol not found' });
    }
    rol.update({ state: false })
    res.status(200).json({ rol });
}

import { Response, Request } from "express";
import { permissionsModel } from "../models/permissions.model";

export const getPermissions = async (req: Request, res: Response) => {
    const permissions = await permissionsModel.findAll();
    res.status(200).json({ permissions });
}
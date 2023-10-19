
import { Response, Request } from "express";
import { suppliesModel } from "../models/supplies.model";

export const getSupplies = async (req: Request, res: Response) => {
    const supplies = await suppliesModel.findAll();
    res.status(200).json({ supplies });
}
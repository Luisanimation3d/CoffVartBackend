import { Response, Request } from "express";
import { shopModel } from "../models/shops.model";

export const getShops = async (req: Request, res: Response) => {
    const shops = await shopModel.findAll();
    res.status(200).json({ shops });
}
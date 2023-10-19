import { Response, Request } from "express";
import { shopdetailsModel } from "../models/shopdetails.model";

export const getShopdetails = async (req: Request, res: Response) => {
    const shopdetails = await shopdetailsModel.findAll();
    res.status(200).json({ shopdetails });
}
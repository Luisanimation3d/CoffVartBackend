import { Response, Request } from "express";

import { suppliesModel } from "../models/supplies.model";
import { shopModel } from "../models/shops.model";


export const getShops = async (req: Request, res: Response) => {
    const shops = await suppliesModel.findAll();
    res.status(200).json({ shops });
}
export const postShops =async(req:Request, res:Response)=> {
    const {invoice, total, state, description} = req.body;
    const newShop = await suppliesModel.create({invoice, total, state, description});
    res.status(200).json({newShop});
}


export const deleteShops= async (req: Request, res: Response) => {
    const { id } = req.params;
    const shops = await shopModel.findByPk(id);
    if (!shops) {
        return res.status(404).json({ msg: 'Shop not found' });
    }
    await shops.destroy();
    res.status(200).json({ shops });
}



import { Response, Request } from "express";
import { suppliesModel } from "../models/supplies.model";

export const getSupplies = async (req: Request, res: Response) => {
    const supplies = await suppliesModel.findAll();
    res.status(200).json({ supplies });
}
export const postSupplies =async(req:Request, res:Response)=> {
    const {name, amount, unitPrice, state, description} = req.body;
    const newSupplies = await suppliesModel.create({name,amount, unitPrice, state, description});
    res.status(200).json({newSupplies});
}

export const putSupplies = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, amount, unitPrice, state, description } = req.body;
    const supplies = await suppliesModel.findByPk(id);
    if (!supplies) {
        return res.status(404).json({ msg: 'Supplies not found' });
    }
    await supplies.update({ name, amount, unitPrice, state, description });
    res.status(200).json({ supplies });
}

export const deleteSupplies= async (req: Request, res: Response) => {
    const { id } = req.params;
    const supplies = await suppliesModel.findByPk(id);
    if (!supplies) {
        return res.status(404).json({ msg: 'Supplies not found' });
    }
    await supplies.destroy();
    res.status(200).json({ supplies});
}
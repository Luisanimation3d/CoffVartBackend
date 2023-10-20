import {Response, Request} from "express";
import { productionOrderModel } from "../models/productionOrders.model";

export const getProductionOrder = async (req: Request, res: Response)=> {
    const productionOrders = await productionOrderModel.findAll();
    res.status(200).json({productionOrders});
}

export const postProducionOrder =async(req:Request, res:Response)=> {
    const {name, address} = req.body;
    const newProductionOrder = await productionOrderModel.create({name,address});
    res.status(200).json({newProductionOrder});
}

export const putProductionOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const productionOrders = await productionOrderModel.findByPk(id);
    if (!productionOrders) {
        return res.status(404).json({ msg: 'ProductionOrder not found' });
    }
    await productionOrders.update({ name, address });
    res.status(200).json({ productionOrders });
}

export const deleteProductionOrder= async (req: Request, res: Response) => {
    const { id } = req.params;
    const productionOrders = await productionOrderModel.findByPk(id);
    if (!productionOrders) {
        return res.status(404).json({ msg: 'ProductionOrder not found' });
    }
    await productionOrders.destroy();
    res.status(200).json({ productionOrders });
}
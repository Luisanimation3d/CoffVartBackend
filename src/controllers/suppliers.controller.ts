import {Response, Request} from "express";
import { supplierModel } from "../models/suppliers.model";

export const getSuppliers = async (req: Request, res: Response)=> {
    const suppliers = await supplierModel.findAll();
    res.status(200).json({suppliers});
}

export const postSuppliers =async(req:Request, res:Response)=> {
    const {name, address} = req.body;
    const newSupplier = await supplierModel.create({name,address});
    res.status(200).json({newSupplier});
}

export const putSuppliers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const suppliers = await supplierModel.findByPk(id);
    if (!suppliers) {
        return res.status(404).json({ msg: 'Supplier not found' });
    }
    await suppliers.update({ name, address });
    res.status(200).json({ suppliers });
}

export const deleteSuppliers= async (req: Request, res: Response) => {
    const { id } = req.params;
    const suppliers = await supplierModel.findByPk(id);
    if (!suppliers) {
        return res.status(404).json({ msg: 'Supplier not found' });
    }
    await suppliers.destroy();
    res.status(200).json({ suppliers});
}
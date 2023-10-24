import { Response, Request } from "express";
import { productModel } from "../models/products.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await productModel.findAll();
    res.status(200).json({ products });
}
export const postProducts =async(req:Request, res:Response)=> {
    const {name, amount, stockMin, stockMax, unitPrice, state, description} = req.body;
    const newProducts = await productModel.create({name, amount, stockMin, stockMax, unitPrice, state, description});
    res.status(200).json({newProducts});
}

export const putProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, amount, stockMin, stockMax, unitPrice, state, description } = req.body;
    const products = await productModel.findByPk(id)
    if (!products) {
        return res.status(404).json({ msg: 'Supplies not found' });
    }
    await products.update({ name, amount, stockMin, stockMax, unitPrice, state, description });
    res.status(200).json({ products });
}

export const deleteProducts= async (req: Request, res: Response) => {
    const { id } = req.params;
    const products = await productModel.findByPk(id);
    if (!products) {
        return res.status(404).json({ msg: 'Supplies not found' });
    }
    await products.destroy();
    res.status(200).json({ products});
}
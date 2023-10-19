import { Response, Request } from "express";
import { productModel } from "../models/products.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await productModel.findAll();
    res.status(200).json({ products });
}
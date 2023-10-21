import { Response, Request } from "express";
import { coustumersModel } from "../models/coustomers.model";

export const getCoustumers = async (req: Request, res: Response) => {
    const coustumers = await coustumersModel.findAll();
    res.status(200).json({ coustumers });
}

export const postCoustumers= async (req: Request, res: Response) => {
    const { name, phone, email, address, state } = req.body;
    const newCoustumers = await coustumersModel.create({ name, phone, email, address, state });
    res.status(200).json({ newCoustumers });
}


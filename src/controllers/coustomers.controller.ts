import { Response, Request } from "express";
import { coustumersModel } from "../models/coustomers.model";

export const getCoustumers = async (req: Request, res: Response) => {
    const coustumers = await coustumersModel.findAll();
    res.status(200).json({ coustumers });
}
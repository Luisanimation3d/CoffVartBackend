import { Response, Request } from "express";
import { coustumersModel } from "../models/coustomers.model";

export const getCoustumers = async (req: Request, res: Response) => {
    const coustumers = await coustumersModel.findAll();
    res.status(200).json({ coustumers });
}

export const postCoustumers= async (req: Request, res: Response) => {
    const { name, documentType, document , phone, email, address, state } = req.body;
    try {
        const existingCoustumer = await coustumersModel.findOne({ where: { document } });
        if (existingCoustumer) {
            return res.status(400).json({ msg: 'A customer with this ID document already exists' });
        }
        const newCoustumers = await coustumersModel.create({ name, documentType, document, phone, email, address, state });
        res.status(200).json({ newCoustumers });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const putCoustumers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, document, documentType, phone, email, address, state } = req.body;
    const coustumers = await coustumersModel.findByPk(id);
    if (!coustumers) {
        return res.status(404).json({ msg: 'Coustumers not found' });
    }
    await coustumers.update({ name, document, documentType, phone, email, address, state });
    res.status(200).json({ coustumers });
}


export const deleteCoustumers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const coustumers = await coustumersModel.findByPk(id);
    if (!coustumers) {
        return res.status(404).json({ msg: 'Coustumers not found' });
    }
    await coustumers.destroy();
    res.status(200).json({ msg: 'Coustumer delete' });
}


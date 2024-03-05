import { Response, Request } from "express";
import { coustumersModel } from "../models/coustomers.model";
import { optionsPagination } from "generalTypes";
import {userModel} from "../models/users.model";

export const getCoustumers = async (req: Request, res: Response) => {
    try {
        const { page, limit, order } = req.query;
        const options: optionsPagination={
            page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        };
        const coustumers = await coustumersModel.findAndCountAll({
            limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
            include: [{
                model: userModel,
                attributes: ['lastname', 'email'],
            }],
        });
        res.status(200).json({ coustumers, options });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
export const getCoustumer = async (req: Request, res: Response) => {
    const {id} = req.params;
    const coustomers= await coustumersModel.findByPk(id);
    if (!coustomers){
        return res.status(404).json({ msg: 'Coustumers not found' });
    }
    res.status(200).json({ coustomers });
}

export const postCoustumers= async (req: Request, res: Response) => {
    const { name, documentType, document , phone, address, state } = req.body;
    try {
        const existingCoustumer = await coustumersModel.findOne({ where: { document } });
        if (existingCoustumer) {
            return res.status(400).json({ msg: 'A customer with this ID document already exists' });
        }
        const newCoustumers = await coustumersModel.create({ name, documentType, document, phone,  address, state });
        res.status(200).json({ newCoustumers });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const putCoustumers = async (req: any, res: any, next: any) => {
    try{
    const { id } = req.params;
    const { name, document, documentType, phone, email, address, state } = req.body;
    const coustomers = await coustumersModel.findByPk(id);
        if (!coustomers) {
            return res.status(404).json({ msg: 'Coustumers not found' });
        }
        await coustomers.update({ name, document, documentType, phone, email, address, state });
        res.status(200).json({ coustomers });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


export const deleteCoustumers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const coustumers = await coustumersModel.findByPk(id);
    if (!coustumers) {
        return res.status(404).json({ msg: 'Coustumers not found' });
    }
    coustumers.update({state: !coustumers.getDataValue('state')});
    res.status(200).json({ coustumers });
}


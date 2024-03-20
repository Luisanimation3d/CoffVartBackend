import { Response, Request } from "express";
import { coustumersModel } from "../models/coustomers.model";
import { optionsPagination } from '../types/generalTypes';

export const getCoustomersActive = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};

		const coustumers = await coustumersModel.findAndCountAll({
			where: { state: true },  
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});

		res.status(200).json({ coustumers, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};
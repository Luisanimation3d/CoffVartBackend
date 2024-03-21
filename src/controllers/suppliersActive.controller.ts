import { Response, Request } from "express";
import { supplierModel } from "../models/suppliers.model";
import { optionsPagination } from 'generalTypes';

export const getSuppliersActive = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};

		const suppliers= await supplierModel.findAndCountAll({
			where: { state: true },
			limit: limit != 'ALL' ? options.limit : undefined,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});

		res.status(200).json({ suppliers, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};
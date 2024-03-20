import { Response, Request } from "express";
import { productModel } from "../models/products.model";
import { optionsPagination } from '../types/generalTypes';

export const getProductsActive = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};

		const products = await productModel.findAndCountAll({
			where: { state: true },  
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});

		res.status(200).json({ products, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};
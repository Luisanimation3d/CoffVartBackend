import { Response, Request } from "express";
import { shopdetailsModel } from "../models/shopdetails.model";
import { optionsPagination } from "generalTypes";
import { productionOrdersDetailsModel } from "../models/productionOrdersDetails.model";
import { salesdetailsModel } from "../models/salesdetails.model";
import { processDetailModel } from "../models/processesDetail.model";

export const getDetails = async (req: Request, res: Response)=> {
    try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
        const details = await productionOrdersDetailsModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order]
               
		});
		res.status(200).json({ details, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};
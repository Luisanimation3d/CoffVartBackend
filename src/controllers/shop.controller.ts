import { Response, Request } from "express";
import { optionsPagination } from '../types/generalTypes';
import { suppliesModel } from "../models/supplies.model";
import { shopModel } from "../models/shops.model";
import { shopdetailsModel } from "../models/shopdetails.model";
import { supplierModel } from "../models/suppliers.model";


export const getShops = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const roles = await shopModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
			include: [
				{
					model: shopdetailsModel,
					// Get name of the permissions associated with the role
					include: [
						{
							model: suppliesModel,
							attributes: ['id', 'name', 'unitPrice', 'amount'],
						},
                        {
                            model: supplierModel,
                            attributes: ['id', 'name'],
                        }
					],
				},
			],
		});
		res.status(200).json({ roles, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};



export const getShop = async (req: Request, res: Response) => {
	const { id } = req.params;
	const shop = await shopModel.findByPk(id, {
		include: [
			{
				model: shopdetailsModel,
				include: [
					{
						model: suppliesModel,
						attributes: ['id', 'name', 'unitPrice', 'amount'],
					},
                    {
                        model: supplierModel,
                        attributes: ['id', 'name'],
                    }
				]
			},
		],
	});
	if (!shop) {
		return res.status(404).json({ msg: 'Shop not found' });
	}
	res.status(200).json({ shop });
};


export const postShop = async (req: Request, res: Response) => {
    const { name, invoice, total, date, description, supplier, supplies } = req.body;
    try {
      const newShop = await shopModel.create({ name, invoice, total, date, description, supplier });
      const suppliesInstance = supplies.map((supply: any) => ({
        shopId: newShop.getDataValue('id'),
        supplyId: supply.id,
        unitPrice: supply.unitPrice,
        amount: supply.amount,
      }));
      await shopdetailsModel.bulkCreate(suppliesInstance);
      res.status(201).json({ newShop, suppliesInstance });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  };

  export const deleteShop = async (req: Request, res: Response) => {
	const { id } = req.params;
	const shop = await shopModel.findByPk(id);
	if (!shop) {
		return res.status(404).json({ msg: 'Shop not found' });
	}
	shop.update({ state: false });
	res.status(200).json({ shop });
};




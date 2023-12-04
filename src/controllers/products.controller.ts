import { Response, Request } from "express";
import { productModel } from "../models/products.model";
import { optionsPagination } from '../types/generalTypes';
import { productionOrderModel } from "../models/productionOrders.model";

export const getProducts = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const products = await productModel.findAndCountAll({
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

export const getProduct = async (req: Request, res: Response) => {
	try{const { id } = req.params;
	const product = await productModel.findByPk(id, {
	});
	if (!product) {
		return res.status(404).json({ msg: 'Product not found' });
	}
	res.status(200).json({ product });
    }catch (error){
    console.log(error);
    res.status(500).json({msg:error});
    }
};

export const postProducts =async(req:Request, res:Response)=> {
    try{const {name, amount, stockMin, stockMax, unitPrice, state, description, productionOrder} = req.body;
    const newProducts = await productModel.create({name, amount, stockMin, stockMax, unitPrice, state, description, productionOrder});
    res.status(200).json({newProducts});
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    }
}

export const putProducts = async (req: Request, res: Response) => {
    try{const { id } = req.params;
    const { name, amount, stockMin, stockMax, unitPrice, state, description, productionOrder } = req.body;
    const products = await productModel.findByPk(id)
    if (!products) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    await products.update({ name, amount, stockMin, stockMax, unitPrice, state, description, productionOrder });
    res.status(200).json({ products });
    }catch (error){
    console.log(error);
    res.status(500).json({msg:error});
    }
}

export const deleteProducts= async (req: Request, res: Response) => {
    try{const { id } = req.params;
    const products = await productModel.findByPk(id);
    if (!products) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    await products.destroy();
    res.status(200).json({ products});
    }catch (error){
    console.log(error);
    res.status(500).json({msg:error});
    }
}
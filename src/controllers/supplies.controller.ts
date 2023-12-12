import { Response, Request } from "express";
import { suppliesModel } from "../models/supplies.model";
import { optionsPagination } from '../types/generalTypes';



export const getSupplies = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const supplies = await suppliesModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});
		res.status(200).json({ supplies, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};


export const getSupply = async (req: Request, res: Response) => {
	try{const { id } = req.params;
	const supply = await suppliesModel.findByPk(id, {
	});
	if (!supply) {
		return res.status(404).json({ msg: 'Supply not found' });
	}
	res.status(200).json({ supply });
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    
    }
};

export const postSupplies =async(req:Request, res:Response)=> {
   try{ const {name, amount, unitPrice, state, supplier,description} = req.body;
    const newSupplies = await suppliesModel.create({name,amount, unitPrice, state, supplier,description});
    res.status(200).json({newSupplies});
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    }
}

export const putSupplies = async (req: Request, res: Response) => {
   try{ const { id } = req.params;
    const { name, amount, unitPrice, state, supplier,description } = req.body;
    const supplies = await suppliesModel.findByPk(id);
    if (!supplies) {
        return res.status(404).json({ msg: 'Supplies not found' });
    }
    await supplies.update({ name, amount, unitPrice, state, supplier,description });
    res.status(200).json({ supplies });
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    }
}

export const deleteSupplies= async (req: Request, res: Response) => {
    const { id } = req.params;
	const supply = await suppliesModel.findByPk(id);
	if (!supply) {
		return res.status(404).json({ msg: 'Supply not found' });
	}
	supply.update({ state: !supply.getDataValue('state') });
	res.status(200).json({ supply });
};
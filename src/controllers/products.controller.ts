import { Response, Request } from "express";
import { productModel } from "../models/products.model";
import { optionsPagination } from '../types/generalTypes';

import fs from 'fs';
import path from "path";

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
    try{const {name, amount, stockMin, stockMax, amountSupply, unitPrice, state, description} = req.body;
    const newProducts = await productModel.create({name, amount, stockMin, stockMax, amountSupply, unitPrice, state, description});
    res.status(200).json({newProducts, message: 'Producto creado correctamente'});
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    }
}

export const putProducts = async (req: Request, res: Response) => {
    try{const { id } = req.params;
    const { name, amount, stockMin, stockMax, unitPrice, amountSupply, state, description } = req.body;
    const products = await productModel.findByPk(id)
    if (!products) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    await products.update({ name, amount, stockMin, stockMax, unitPrice, amountSupply, state, description });
    res.status(200).json({ products, message: 'Producto actualizado correctamente' });
    }catch (error){
    console.log(error);
    res.status(500).json({msg:error});
    }
}

export const deleteProducts= async (req: Request, res: Response) => {
    const { id } = req.params;
	const product = await productModel.findByPk(id);
	if (!product) {
		return res.status(404).json({ msg: 'Product not found' });
	}
	product.update({ state: !product.getDataValue('state') });
	res.status(200).json({ product });
};

export const uploadImage = async (req: Request, res: Response) => {
    try {

        if(!req.file){
            return res.status(400).json({msg: 'No se ha subido ninguna imagen'});
        }

        let fileName: string[] = req.file.originalname.split('\.');

        const ext = fileName[fileName.length - 1];

        const validExtensions = ['png', 'jpg', 'jpeg'];

        if(!validExtensions.includes(ext)){
            fs.unlink(req.file?.path as string, err => {
               console.log(err)
            });

            return res.status(400).json({msg: 'La extensión del archivo no es válida'});
        }

        return res.status(200).json({msg: 'Archivo subido correctamente', image: req.file?.filename});

    }catch (e) {
        console.log(e);
        res.status(500).json({msg: e});
    }
}

export const getImage = async (req: Request, res: Response) => {
    const {image} = req.params;
    const pathImage = `./src/uploads/products/${image}`;

    fs.access(pathImage, err => {

        if(err) {
            return res.sendFile(path.resolve('./src/uploads/products/no-image.jpg'));
        }

        return res.sendFile(path.resolve(pathImage));

    })
}
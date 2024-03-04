import { Request, Response, NextFunction } from 'express';
import { productModel } from "../models/products.model";
import { permissionsModel } from '../models/permissions.model';
import { roleDetailsModel } from '../models/roleDetails.model';
import { rolesModel } from '../models/roles.model';
import { JwtPayloadWithTokenData } from 'token';
import { validarSinEspacios, validarSoloEspacios, validarSoloLetras, validarSoloNumeros } from "./globalValidations.middlewares";


interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}

export const validateRouteGet = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const productFound = await productModel.findByPk(id);
    if (!productFound) {
        res.status(400).json({ error: 'Product not found' });
        return;
    }
    next();
}

export const unitPricevalidation = /^\d{5,10}-\d$/;
export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, amount, stockMin,stockMax,unitPrice,description } = req.body;

    let errores = validarSinEspacios({name, description, stockMin, stockMax});
    if (Object.keys(errores).length > 0) {
          res.status(400).json(errores);
          return;
      } 
    let erroresSpace = validarSoloEspacios({name, description, stockMin, stockMax});
    if (Object.keys(erroresSpace).length > 0) {
          res.status(400).json(erroresSpace);
          return;
      }
    let erroresNumbers = validarSoloNumeros({unitPrice, stockMin, stockMax, amount});
    if (Object.keys(erroresNumbers).length > 0) {
          res.status(400).json(erroresNumbers);
          return;
      }
    let erroresLetter = validarSoloLetras({name});
      if (Object.keys(erroresLetter).length > 0) {
          res.status(400).json(erroresLetter);
          return;
      }
      

    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const productFound = await productModel.findOne({ where: { name } });
        if (productFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }
    if(!amount){
        res.status(400).json({ error: 'amount is required' });
        return;
    }
    if(!amount.isNumeric){
        res.status(400).json({ error: 'amount must be numeric' });
        return;
    }
    if(!stockMin){
        res.status(400).json({ error: 'stockMin is required' });
        return;
    }
    if(!stockMin.isNumeric){
        res.status(400).json({ error: 'stockMin must be numeric' });
        return;
    }
    if(!stockMax){
        res.status(400).json({ error: 'stockMax is required' });
        return;
    }
    if(!stockMax.isNumeric){
        res.status(400).json({ error: 'stockMax must be numeric' });
        return;
    }
    if (!unitPrice) {
        res.status(400).json({ error: 'unitPrice is required' });
        return;
    }
    if(!unitPrice.isNumeric){
        res.status(400).json({ error: 'unitPrice must be numeric' });
        return;
    }
    if (!description) {
        res.status(400).json({ error: 'description is required' });
        return;
    }
    next();
}

export const validateRoutePut = async (req: any, res: any, next: any) => {
    const { name, amount, stockMin,stockMax,unitPrice,description } = req.body;

    let errores = validarSinEspacios({name, description, stockMin, stockMax});
    if (Object.keys(errores).length > 0) {
          res.status(400).json(errores);
          return;
      } 
    let erroresSpace = validarSoloEspacios({name, description, stockMin, stockMax});
    if (Object.keys(erroresSpace).length > 0) {
          res.status(400).json(erroresSpace);
          return;
      }
    let erroresNumbers = validarSoloNumeros({unitPrice, stockMin, stockMax, amount});
    if (Object.keys(erroresNumbers).length > 0) {
          res.status(400).json(erroresNumbers);
          return;
      }
    let erroresLetter = validarSoloLetras({name});
      if (Object.keys(erroresLetter).length > 0) {
          res.status(400).json(erroresLetter);
          return;
      }

    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const productFound = await productModel.findOne({ where: { name } });
        if (productFound) {
            res.status(400).json({ error: 'name already exists' });
            return;
        }
    }
    if(!amount){
        res.status(400).json({ error: 'amount is required' });
        return;
    }
    if(!amount.isNumeric){
        res.status(400).json({ error: 'amount must be numeric' });
        return;
    }
    if(!stockMin){
        res.status(400).json({ error: 'stockMin is required' });
        return;
    }
    if(!stockMin.isNumeric){
        res.status(400).json({ error: 'stockMin must be numeric' });
        return;
    }
    if(!stockMax){
        res.status(400).json({ error: 'stockMax is required' });
        return;
    }
    if(!stockMax.isNumeric){
        res.status(400).json({ error: 'stockMax must be numeric' });
        return;
    }
    if (!unitPrice) {
        res.status(400).json({ error: 'unitPrice is required' });
        return;
    }
    if(!unitPrice.isNumeric){
        res.status(400).json({ error: 'unitPrice must be numeric' });
        return;
    }
    if (!description) {
        res.status(400).json({ error: 'description is required' });
        return;
    }
    next();
}


export const validateRouteDelete = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const productFound = await productModel.findByPk(id);
    if (!productFound) {
        res.status(400).json({ error: 'Product not found' });
        return;
    }
    next();
}

export const GetProductsMiddleware = async (
	req: ExtendRequest,
	res: Response,
	next: NextFunction
) => {

    const roleId = req.user.role;
	const rolePermission = await rolesModel.findByPk(roleId, {
		include: [
			{
				model: roleDetailsModel,
				include: [
					{
						model: permissionsModel,
						attributes: ['name'],
					},
				],
			},
		],
	});

	const permission = rolePermission
		?.getDataValue('rol_details')
		.find(
			(element: any) => element.getDataValue('permission').name === 'Get Products'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PostProductsMiddleware = async (
	req: ExtendRequest,
	res: Response,
	next: NextFunction
) => {

    const roleId = req.user.role;
	const rolePermission = await rolesModel.findByPk(roleId, {
		include: [
			{
				model: roleDetailsModel,
				include: [
					{
						model: permissionsModel,
						attributes: ['name'],
					},
				],
			},
		],
	});

	const permission = rolePermission
		?.getDataValue('rol_details')
		.find(
			(element: any) => element.getDataValue('permission').name === 'Post Products'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PutProductsMiddleware = async (
	req: ExtendRequest,
	res: Response,
	next: NextFunction
) => {

    const roleId = req.user.role;
	const rolePermission = await rolesModel.findByPk(roleId, {
		include: [
			{
				model: roleDetailsModel,
				include: [
					{
						model: permissionsModel,
						attributes: ['name'],
					},
				],
			},
		],
	});

	const permission = rolePermission
		?.getDataValue('rol_details')
		.find(
			(element: any) => element.getDataValue('permission').name === 'Put Products'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

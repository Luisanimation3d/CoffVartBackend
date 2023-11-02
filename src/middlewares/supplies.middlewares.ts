import { Request, Response, NextFunction } from 'express';
import { suppliesModel } from "../models/supplies.model";
import { permissionsModel } from '../models/permissions.model';
import { roleDetailsModel } from '../models/roleDetails.model';
import { rolesModel } from '../models/roles.model';
import { JwtPayloadWithTokenData } from 'token';


interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}



export const validateRouteGet = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const suppliesFound = await suppliesModel.findByPk(id);
    if (!suppliesFound) {
        res.status(400).json({ error: 'Supplies not found' });
        return;
    }
    next();
}



export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, amount, unitPrice,description } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const suppliesFound = await suppliesModel.findOne({ where: { name } });
        if (suppliesFound) {
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
    if (!unitPrice) {
        res.status(400).json({ error: 'unitPrice is required' });
        return;
    }
    if (!unitPrice.isNumeric) {
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
    const { name, amount, unitPrice,description } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (name) {
        const suppliesFound = await suppliesModel.findOne({ where: { name } });
        if (suppliesFound) {
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
    if (!unitPrice) {
        res.status(400).json({ error: 'unitPrice is required' });
        return;
    }
    if (!unitPrice.isNumeric) {
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
    const suppliesFound = await suppliesModel.findByPk(id);
    if (!suppliesFound) {
        res.status(400).json({ error: 'Supplies not found' });
        return;
    }
    next();
}


export const GetSuppliesMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Get Supplies'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};
export const PostSuppliesMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Post Supplies'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PutSuppliesMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Put Supplies'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};
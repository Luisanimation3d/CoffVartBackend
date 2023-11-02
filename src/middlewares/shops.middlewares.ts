import { Request, Response, NextFunction } from 'express';
import { shopModel } from "../models/shops.model";
import { permissionsModel } from '../models/permissions.model';
import { roleDetailsModel } from '../models/roleDetails.model';
import { rolesModel } from '../models/roles.model';
import { JwtPayloadWithTokenData } from 'token';


interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}

export const validateRouteGet = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const shopsFound = await shopModel.findByPk(id);
    if (!shopsFound) {
        res.status(400).json({ error: 'Supplies not found' });
        return;
    }
    next();
}


export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { invoice, state } = req.body;
    if (!invoice) {
        res.status(400).json({ error: 'invoice is required' });
        return;
    }
    if (invoice) {
        const shopFound = await shopModel.findOne({ where: { invoice } });
        if (shopFound) {
            res.status(400).json({ error: 'invoice already exists' });
            return;
        }
    }
    if(!state){
        res.status(400).json({ error: 'state is required' });
        return;
    }
    next();
}

export const validateRoutePut = async (req: any, res: any, next: any) => {
    const { invoice, state } = req.body;
    if (!invoice) {
        res.status(400).json({ error: 'invoice is required' });
        return;
    }
    if (invoice) {
        const shopFound = await shopModel.findOne({ where: { invoice } });
        if (shopFound) {
            res.status(400).json({ error: 'invoice already exists' });
            return;
        }
    }
    if(!state){
        res.status(400).json({ error: 'state is required' });
        return;
    }
    next();
}

export const validateRouteDelete = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const shopFound = await shopModel.findByPk(id);
    if (!shopFound) {
        res.status(400).json({ error: 'shop not found' });
        return;
    }
    next();
}

export const GetShopsMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Get Shops'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PostShopsMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Post Shops'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

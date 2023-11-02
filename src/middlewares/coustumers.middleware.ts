import { coustumersModel } from "../models/coustomers.model";
import { Request, Response, NextFunction } from 'express';
import { roleDetailsModel } from '../models/roleDetails.model';
import { permissionsModel } from '../models/permissions.model';
import { rolesModel } from '../models/roles.model';
import { JwtPayloadWithTokenData } from 'token';
interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData 
}

/**
 * The GetUsersMiddleware function checks if the user has the permission to get users and returns an
 * error if not.
 * @param {ExtendRequest} req - The `req` parameter is an object that represents the HTTP request being
 * made. It contains information such as the request headers, query parameters, request body, and user
 * information (if available).
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the chain. It is typically used to move to the next middleware
 * function after the current middleware function has completed its tasks.
 * @returns If the permission is found, the middleware will call the `next()` function, indicating that
 * the request can proceed to the next middleware or route handler.
 */


export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, documentType, document, phone, email, address, state } = req.body;
    if (!name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    if (document) {
        const coustumerFound = await coustumersModel.findOne({ where: { document } });
        if (coustumerFound) {
            res.status(400).json({ error: 'coustumer already exists' });
            return;
        }
    }

    if(!phone){
        res.status(400).json({ error: 'phone is required' });
        return;
    }
    if (!address) {
        res.status(400).json({ error: 'address is required' });
        return;
    }
    if (!email) {
        res.status(400).json({ error: 'email is required' });
        return;
    }
    if (!state) {
        res.status(400).json({ error: 'state is required' });
        return;
    }
    if (!documentType) {
        res.status(400).json({ error: 'documentType is required' });
        return;
    }
    if (!document) {
        res.status(400).json({ error: 'document is required' });
        return;
    }
    next();
}
export const validateRoutePut = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { name, document, documentType, phone, email, address, state } = req.body;
    if (document){
        const coustumerFound = await coustumersModel.findOne({ where: { document } });
        if (coustumerFound) {
            res.status(400).json({ error: 'coustumer already exists' });
            return;
        }
    }
}

export const GetCoustumersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Get Coustumers'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PostCoustumersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Post Coustumers'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PutCoustumersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Put Coustumers'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const DeleteCoustumersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'delete Coustumers'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};


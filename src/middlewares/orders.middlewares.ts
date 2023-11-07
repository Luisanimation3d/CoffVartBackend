import { ordersModel } from "../models/orders.model";
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
    const { code, state, total } = req.body;
    if (!code) {
        res.status(400).json({ error: 'code is required' });
        return;
    }
    if (code) {
        const supplierFound = await ordersModel.findOne({ where: { code } });
        if (supplierFound) {
            res.status(400).json({ error: 'invoice already exists' });
            return;
        }
    }
    if(!state){
        res.status(400).json({ error: 'state is required' });
        return;
    }
    if (!total){
        res.status(400).json({ error: 'total is required' });
        return;
    }
    next();
}

export const GetOrdersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Get Orders'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};

export const PostOrdersMiddleware = async (
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
			(element: any) => element.getDataValue('permission').name === 'Post Orders'
		);
	if (!permission) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	next();
};



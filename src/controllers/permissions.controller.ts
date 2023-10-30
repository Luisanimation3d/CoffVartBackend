import { Response, Request } from 'express';
import { permissionsModel } from '../models/permissions.model';
import { OrderItem } from 'sequelize';
interface options {
    page: number;
    limit: number;
    paginate: number;
    order: OrderItem;
}

export const getPermissions = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: options = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
        // Do an example of pagination's query URL
        // Query = http://localhost:3000/api/permissions?page=1&limit=10&order=["id","ASC"]
		const permissions = await permissionsModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
            order: [options.order],
		});
		// const permissions = await permissionsModel.findAll();
		res.status(200).json({ permissions, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

export const postPermission = async (req: Request, res: Response) => {
	const { name, description } = req.body;
	const newPermission = await permissionsModel.create({ name, description });
	res.status(200).json({ newPermission });
};

export const putPermission = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;
	const permission = await permissionsModel.findByPk(id);
	if (!permission) {
		return res.status(404).json({ msg: 'Permission not found' });
	}
	await permission.update({ name, description });
	res.status(200).json({ permission });
};

export const deletePermission = async (req: Request, res: Response) => {
	const { id } = req.params;
	const permission = await permissionsModel.findByPk(id);
	if (!permission) {
		return res.status(404).json({ msg: 'Permission not found' });
	}
	await permission.destroy();
	res.status(200).json({ permission });
};

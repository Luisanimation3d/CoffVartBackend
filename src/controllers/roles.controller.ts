import { Response, Request } from 'express';
import { rolesModel } from '../models/roles.model';
import { roleDetailsModel } from '../models/roleDetails.model';

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await rolesModel.findAll({
			include: [
				{
					model: roleDetailsModel
				},
			],
		});
		res.status(200).json({ roles });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

export const getRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const role = await rolesModel.findByPk(id, {
		include: [
			{
				model: roleDetailsModel,
				as: 'rolDetails',
			},
		],
	});
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	res.status(200).json({ role });
};

export const postRole = async (req: Request, res: Response) => {
	const { name, description, permissions } = req.body;
    try{
        const newRole = await rolesModel.create({ name, description });
        const permissionsInstance = permissions.map((permission: any) => ({
            rolId: newRole.getDataValue('id'),
            permissionId: permission
        }));
        await roleDetailsModel.bulkCreate(permissionsInstance);
        res.status(201).json({ newRole, permissionsInstance });
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

export const putRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;
	const role = await rolesModel.findByPk(id);
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	await role.update({ name, description });
	res.status(200).json({ role });
};

export const deleteRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const role = await rolesModel.findByPk(id);
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	role.update({ state: false });
	res.status(200).json({ role });
};

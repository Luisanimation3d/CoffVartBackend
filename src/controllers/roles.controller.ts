import { Response, Request } from 'express';
import { rolesModel } from '../models/roles.model';
import { roleDetailsModel } from '../models/roleDetails.model';
import { permissionsModel } from '../models/permissions.model';
import { optionsPagination } from 'generalTypes';

/**
 * The `getRoles` function is an asynchronous function that retrieves roles from a database with
 * pagination and includes associated role details and permissions.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * HTTP request made to the server. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 */
export const getRoles = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const roles = await rolesModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
			include: [
				{
					model: roleDetailsModel,
					// Get name of the permissions associated with the role
					include: [
						{
							model: permissionsModel,
							attributes: ['id', 'name'],
						},
					],
				},
			],
		});


		res.status(200).json({ roles: {...roles, count: roles.rows.length}, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The function `getRole` retrieves a role and its associated details and permissions based on the
 * provided ID.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 * @returns a JSON response with the role object if it exists, or a JSON response with an error message
 * if the role is not found.
 */
export const getRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const role = await rolesModel.findByPk(id, {
		include: [
			{
				model: roleDetailsModel,
				include: [
					{
						model: permissionsModel,
						attributes: ['id', 'name'],
					},
				]
			},
		],
	});
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	res.status(200).json({ role });
};

/**
 * The `postRole` function creates a new role with the given name and description, and associates it
 * with the specified permissions.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const postRole = async (req: Request, res: Response) => {
	const { name, description, permissions } = req.body;
	try {
		const newRole = await rolesModel.create({ name, description });
		const permissionsInstance = permissions.map((permission: any) => ({
			rolId: newRole.getDataValue('id'),
			permissionId: permission,
		}));
		await roleDetailsModel.bulkCreate(permissionsInstance);
		res.status(201).json({ newRole, permissionsInstance });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The `putRole` function updates a role's name, description, and permissions in the database.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the updated role object if the role is found and updated successfully.
 * If the role is not found, it returns a JSON response with a 404 status and a message indicating that
 * the role was not found.
 */
export const putRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description, permissions } = req.body;
	const role = await rolesModel.findByPk(id);
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	role.update({ name, description });
	const permissionsInstance = permissions.map((permission: any) => ({
		rolId: role.getDataValue('id'),
		permissionId: permission,
	}));
	await roleDetailsModel.destroy({ where: { rolId: id } });
	await roleDetailsModel.bulkCreate(permissionsInstance);
	res.status(200).json({ role });
};

/**
 * The function deletes a role by setting its state to false.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant information.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 * @returns a JSON response with the updated role object if it exists. If the role does not exist, it
 * returns a JSON response with a 404 status and a message stating that the role was not found.
 */
export const deleteRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const role = await rolesModel.findByPk(id);
	if (!role) {
		return res.status(404).json({ msg: 'role not found' });
	}
	role.update({ state: !role.getDataValue('state') });
	res.status(200).json({ role });
};

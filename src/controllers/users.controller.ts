import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/users.model';
import { UserModelType } from 'user';
import { optionsPagination } from 'generalTypes';
import {coustumersModel} from "../models/coustomers.model";
import {rolesModel} from "../models/roles.model";

/**
 * The getUsers function is an asynchronous function that retrieves users from a database based on
 * pagination options and returns the users and pagination options in the response.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * HTTP request made by the client. It includes details such as the request headers, query parameters,
 * and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const getUsers = async (req: Request, res: Response) => {
	try {
        const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const users = await userModel.findAndCountAll({
            limit: options.limit,
            offset: options.limit * (options.page - 1),
            order: [options.order],
            include: [
                {
                    model: rolesModel,
                    as: 'role',
                    attributes: ['name'],
                },
                {
                    model: coustumersModel,
                    as: 'coustumer',
                    attributes: ['name', 'document', 'documentType', 'address', 'phone'],
                }
            ]
        });
		res.status(200).json({ users, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The function `getUser` retrieves a user by their ID and returns it in the response, or returns an
 * error if the user is not found or an exception occurs.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the user object if the user is found, or a JSON response with an error
 * message if there is an error or if the user is not found.
 */
export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user: UserModelType | null = await userModel.findByPk(id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The function `postUser` creates a new user with the provided information and returns the created
 * user.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const postUser = async (req: Request, res: Response) => {
    const { name, lastname, address, phone, email, password, roleId, documentType, document } = req.body;
	try {
        const passwordHash = bcrypt.hashSync(password, 10);
		const newUser = await userModel.create({ name, lastname, address, phone, email, password: passwordHash, roleId });
        const newCoustumer = await coustumersModel.create({ documentType, document, userId: newUser.id, phone, address, name: `${name} ${lastname}` });
		res.status(200).json({ newUser, newCoustumer });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The `putUser` function updates a user's information in a database and returns the updated user.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the updated user object if the user is found and updated successfully.
 * If the user is not found, it returns a 404 status code with a JSON response indicating that the user
 * was not found. If there is an error during the update process, it returns a 500 status code with a
 * JSON response containing the error message.
 */
export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { name, lastname, address, phone, email, password, roleId } = req.body;
    const { name, lastname, address, phone, email, password,  roleId,  documentType, document } = req.body;
    try {
        const user: UserModelType | null = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        await user.update({ name, lastname, address, phone, email, password: passwordHash, roleId });
        const coustumer = await coustumersModel.findOne({ where: { userId: user.id } });
        if (!coustumer) {
            return res.status(404).json({ msg: 'Coustumer not found' });
        }
        await coustumer.update({ documentType, document, userId: user.id, phone, address, name: `${name} ${lastname}` });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

/**
 * The deleteUser function is an asynchronous function that deletes a user by their ID and updates
 * their state to inactive.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the updated user object if the user is found and successfully updated.
 * If the user is not found, it returns a 404 status code with a JSON response indicating that the user
 * was not found. If there is an error during the process, it returns a 500 status code with a JSON
 * response containing the error message.
 */
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user: UserModelType | null = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        await user.update({ state: !user.state });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

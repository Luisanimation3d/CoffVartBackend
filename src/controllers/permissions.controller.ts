import {Response, Request} from 'express';
import {permissionsModel} from '../models/permissions.model';
import {optionsPagination} from 'generalTypes';
import {Op} from "sequelize";


/**
 * The function `getPermissions` is an asynchronous function that retrieves permissions from a database
 * based on the provided request parameters and returns them along with pagination options in the
 * response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, query parameters, request body, and
 * more.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const getPermissions = async (req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const {page, limit, order} = req.query;
        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            paginate: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        };
        const permissions = await permissionsModel.findAndCountAll({
            // limit: options.limit,
            // offset: options.limit * (options.page - 1),
            // order: [options.order],
            where: search ? {
                name: {
                    [Op.iLike]: `%${search}%`,
                },
            } : []
        });
        res.status(200).json({permissions, options});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

/**
 * The function `getPermission` retrieves a permission by its ID and returns it in the response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the permission object if it exists, or a 404 status code with a
 * message "Permission not found" if the permission does not exist. If there is an error, it will
 * return a 500 status code with the error message.
 */
export const getPermission = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const permission = await permissionsModel.findByPk(id);
        if (!permission) {
            return res.status(404).json({msg: 'Permission not found'});
        }
        res.status(200).json({permission});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

/**
 * The above function handles the creation of a new permission in a TypeScript application.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 */
export const postPermission = async (req: Request, res: Response) => {
    try {
        const {name, description} = req.body;
        const newPermission = await permissionsModel.create({name, description});
        res.status(200).json({newPermission});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

/**
 * The function `putPermission` updates a permission record in the database based on the provided ID,
 * name, and description.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is an instance of the `Response` class, which provides methods and
 * properties for manipulating the response.
 * @returns a JSON response with the updated permission object if the permission is found and updated
 * successfully. If the permission is not found, it returns a 404 status code with a JSON response
 * indicating that the permission was not found. If there is an error during the process, it returns a
 * 500 status code with a JSON response containing the error message.
 */
export const putPermission = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        const permission = await permissionsModel.findByPk(id);
        if (!permission) {
            return res.status(404).json({msg: 'Permission not found'});
        }
        await permission.update({name, description});
        res.status(200).json({permission});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

/**
 * The `deletePermission` function is an asynchronous function that deletes a permission based on the
 * provided ID and returns a response with the deleted permission or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the deleted permission if it exists, or a "Permission not found"
 * message if it does not exist. If there is an error, it will return a 500 status code with the error
 * message.
 */
export const deletePermission = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const permission = await permissionsModel.findByPk(id);
        if (!permission) {
            return res.status(404).json({msg: 'Permission not found'});
        }
        await permission.destroy();
        res.status(200).json({permission});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

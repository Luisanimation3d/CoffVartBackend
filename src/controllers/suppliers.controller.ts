import {Response, Request} from "express";
import { supplierModel } from "../models/suppliers.model";
import { optionsPagination } from '../types/generalTypes';

/**
 * The function `getsupplierss` is an asynchronous function that retrieves supplierss from a database
 * based on the provided request parameters and returns them along with pagination options in the
 * response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, query parameters, request body, and
 * more.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const getSuppliers = async (req: Request, res: Response)=> {
    try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const suppliers = await supplierModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});
		res.status(200).json({ suppliers, options });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};

/**
 * The function `getsuppliers` retrieves a suppliers by its ID and returns it in the response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the suppliers object if it exists, or a 404 status code with a
 * message "suppliers not found" if the suppliers does not exist. If there is an error, it will
 * return a 500 status code with the error message.
 */
export const getSupplier = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const supplier = await supplierModel.findByPk(id);
		if (!supplier) {
			return res.status(404).json({ msg: 'supplier not found' });
		}
		res.status(200).json({ supplier });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error });
	}
};
/**
 * The above function handles the creation of a new suppliers in a TypeScript application.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 */
export const postSuppliers =async(req:Request, res:Response)=> {
    try {
        const {name, nit, coffeType,address,phone,quality} = req.body;
        const newSupplier = await supplierModel.create({name,nit,coffeType,address,phone,quality});
        res.status(200).json({newSupplier, message: 'Proveedor creado correctamente'});
    } catch (error) {
        console.log(error);
		res.status(500).json({ msg: error});
    }

};
/**
 * The function `putsuppliers` updates a suppliers record in the database based on the provided ID,
 * name, and description.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is an instance of the `Response` class, which provides methods and
 * properties for manipulating the response.
 * @returns a JSON response with the updated suppliers object if the suppliers is found and updated
 * successfully. If the suppliers is not found, it returns a 404 status code with a JSON response
 * indicating that the suppliers was not found. If there is an error during the process, it returns a
 * 500 status code with a JSON response containing the error message.
 */
export const putSuppliers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name,coffeType,address,phone,quality,state } = req.body;
        const suppliers = await supplierModel.findByPk(id);
        if (!suppliers) {
            return res.status(404).json({ msg: 'Supplier not found' });
        }
        await suppliers.update({ name, coffeType,address,phone,quality,state });
        res.status(200).json({ suppliers, message: 'Proveedor editado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
    
};
/**
 * The `deletesuppliers` function is an asynchronous function that deletes a suppliers based on the
 * provided ID and returns a response with the deleted suppliers or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the deleted suppliers if it exists, or a "suppliers not found"
 * message if it does not exist. If there is an error, it will return a 500 status code with the error
 * message.
 */
export const deleteSuppliers= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const supplier = await supplierModel.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ msg: 'Supplier not found' });
        }
        await supplier.update({state: !supplier.getDataValue('state')});
        res.status(200).json({ supplier});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
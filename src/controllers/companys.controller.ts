import {Response, Request} from "express";
import { companyModel } from "../models/companys.model";
import { optionsPagination } from "generalTypes";


/**
 * The function `getCompanys` is an asynchronous function that retrieves Companys from a database
 * based on the provided request parameters and returns them along with pagination options in the
 * response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, query parameters, request body, and
 * more.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const getCompanys = async (req: Request, res: Response) => {
	try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const companys = await companyModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
		});
		return res.status(200).json({ companys, options });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: error });
	}
};

/**
 * The function `getCompany` retrieves a Company by its ID and returns it in the response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the Company object if it exists, or a 404 status code with a
 * message "Company not found" if the Company does not exist. If there is an error, it will
 * return a 500 status code with the error message.
 */

export const getCompany = async (req: Request, res: Response)=> {
    try{
        const {id}=req.params;
        const company= await companyModel.findByPk(id);
        if (!company){
            return res.status(404).json({msg:'Company NOT FOUND'})
        }
        return res.status(200).json({company})
    }catch (error){
        console.log(error);
        res.status(500).json({msg:error});
    }
};

/**
 * The above function handles the creation of a new Company in a TypeScript application.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code and sending JSON data.
 */

export const postCompanys =async(req:Request, res:Response)=> {
    try {
        const {name, nit , email,address,phone} = req.body;
        const newCompany = await companyModel.create({name,nit,email,address,phone});
        res.status(200).json({newCompany});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
        
    }
};

/**
 * The function `putCompany` updates a Company record in the database based on the provided ID,
 * name, and description.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is an instance of the `Response` class, which provides methods and
 * properties for manipulating the response.
 * @returns a JSON response with the updated Company object if the Company is found and updated
 * successfully. If the Company is not found, it returns a 404 status code with a JSON response
 * indicating that the Company was not found. If there is an error during the process, it returns a
 * 500 status code with a JSON response containing the error message.
 */

export const putCompanys = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name,  email,address,phone,state } = req.body;
        const companys = await companyModel.findByPk(id);
            if (!companys) {
                return res.status(404).json({ msg: 'Company not found' });
            }
            await companys.update({ name,email,address,phone,state });
            res.status(200).json({ companys });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
    
};

/**
 * The `deleteCompany` function is an asynchronous function that deletes a Company based on the
 * provided ID and returns a response with the deleted Company or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the deleted Company if it exists, or a "Company not found"
 * message if it does not exist. If there is an error, it will return a 500 status code with the error
 * message.
 */

export const deleteCompanys= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await companyModel.findByPk(id);
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }
            await company.update({state: !company.getDataValue('state')});
            res.status(200).json({ company });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
    
};
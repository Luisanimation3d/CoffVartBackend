import {Response, Request} from "express";
import { productionRequestModel } from "../models/productionRequests.model";
import { optionsPagination } from '../types/generalTypes';
import { suppliesModel } from "../models/supplies.model";
import { processesModel } from "../models/processes.model";
import { companyModel } from "../models/companys.model";
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

export const getProductionRequests = async (req: Request, res: Response)=> {
    try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const ProductionRequests = await productionRequestModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
            include: [
                {
                    model: suppliesModel,
                    as:'supply',
                    attributes: ['name','amount']
                },
                {
                    model: processesModel,
                    as: 'process',
                    attributes: ['name']
                },
                {
                    model: companyModel,
                    as: 'company',
                    attributes: ['name']
                }
            ]
		});
		res.status(200).json({ ProductionRequests, options });
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
export const getProductionRequest = async (req: Request, res: Response)=> {
    try {
		const { id } = req.params;
		const ProductionRequest = await productionRequestModel.findByPk(id);
		if (!ProductionRequest) {
			return res.status(404).json({ msg: 'ProductionRequest not found' });
		}
		res.status(200).json({ ProductionRequest });
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

export const postProductionRequest =async(req:Request, res:Response)=> {
    const {dateOfDispatch,quantity,supplieLost,reasonCancellation,observations,supplieId,companyId,processId}:
    { dateOfDispatch:Date,quantity:number,supplieLost:number,reasonCancellation:string,observations:string,supplieId: number,companyId: number,processId: number}= req.body;
    try {
        const finalProcessId = processId || 1;

        const process = await processesModel.findByPk(finalProcessId);
    if (!process) {
      return res.status(404).json({
        msg: `Proceso con ID ${finalProcessId} no encontrado`,
      });
    }
    const company = await companyModel.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
        msg: `Empresa con ID ${companyId} no encontrada`,
      });
    }
    const supplie = await suppliesModel.findByPk(supplieId);
    if (!supplie) {
      return res.status(404).json({
        msg: `Insumo con ID ${supplieId} no encontrada`,
      });
    }
    const currentAmount = supplie.getDataValue('amount');

    if (currentAmount < quantity){
      return res.status(400).json({error: 'La cantidad de insumo supera el stock'})
    }

    const newAmount = currentAmount - quantity;

    if(newAmount < 0){
      return res.status(400).json({ error: 'La cantidad de insumos no puede ser menor que 0' });
    }
    await supplie.decrement('amount', { by: (quantity as number) });
    
    const newProductionRequest = await productionRequestModel.create({ dateOfDispatch,quantity,
        companyId: company.getDataValue('id'),
        supplieId: supplie.getDataValue('id'),
        processId: process.getDataValue('id')
      });

        res.status(201).json({newProductionRequest});
    } catch (error) {
        console.log(error);
		res.status(500).json({ msg: error });
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

export const putProductionRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { processId } = req.body;
        const receivedQuantity = req.body.receivedQuantity || 0;
        const ProductionRequests = await productionRequestModel.findByPk(id);
        if (!ProductionRequests) {
          return res.status(404).json({ msg: 'ProductionRequest not found' });
        }
   
        const supplyToUpdate = await suppliesModel.findByPk(2);
        if (!supplyToUpdate) {
            return res.status(404).json({ msg: 'Supply not found' });
        }
        if (receivedQuantity !== undefined) {
          await supplyToUpdate.increment('amount',{by: receivedQuantity})
        }
        const procesoRecibidoId = 3; 
        if (processId === procesoRecibidoId){
          const supplie = await suppliesModel.findByPk(ProductionRequests.getDataValue('supplieId'));
          if (supplie){
            await supplie.increment('amount',{by:receivedQuantity});
          }
        }
        
        const sentQuantity= ProductionRequests.getDataValue('quantity');
        const supplieLost = sentQuantity - receivedQuantity;

        await ProductionRequests.update ({processId,supplieLost});
        res.status(200).json({ ProductionRequests });
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
export const deleteProductionRequest= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ProductionRequests = await productionRequestModel.findByPk(id);
        if (!ProductionRequests) {
            return res.status(404).json({ msg: 'ProductionRequest not found' });
        }
        await ProductionRequests.destroy();
        res.status(200).json({ ProductionRequests });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
    
};
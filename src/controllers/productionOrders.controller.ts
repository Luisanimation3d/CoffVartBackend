import {Response, Request} from "express";
import { productionOrderModel } from "../models/productionOrders.model";
import { optionsPagination } from '../types/generalTypes';
import { productModel } from "../models/products.model";
import { processesModel } from "../models/processes.model";
import { suppliesModel } from "../models/supplies.model";
import { productionOrdersDetailsModel } from "../models/productionOrdersDetails.model";
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

export const getProductionOrders = async (req: Request, res: Response)=> {
    try {
		const { page, limit, order } = req.query;
		const options: optionsPagination = {
			page: parseInt(page as string, 10) || 1,
			limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
		const productionOrders = await productionOrderModel.findAndCountAll({
			limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
            include: [
                {   
                    model:productionOrdersDetailsModel,
                    include: [
                        {
                            model: suppliesModel,
                            attributes: ['id','name'],
                        },
                        {
                            model: processesModel,
                            attributes: ['id','name']
                        }
                    ],     
                },
                
            ],
		});
		res.status(200).json({ productionOrders, options });
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
export const getProductionOrder = async (req: Request, res: Response)=> {
    try {
		const { id } = req.params;
		const productionOrder = await productionOrderModel.findByPk(id, {
            include: [
                {
                    model: productionOrdersDetailsModel,
                    as: 'productionOrdersDetails'
                }
            ]
        });
		if (!productionOrder) {
			return res.status(404).json({ msg: 'productionOrder not found' });
		}
		res.status(200).json({ productionOrder });
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

export const postProductionOrder =async(req:Request, res:Response)=> {
    const {orderNumber,quantity, reasonCancellation ,supplieId,processId,Productdetails}: { orderNumber:string,quantity:Float64Array, reasonCancellation:string, supplieId:number, processId:number, Productdetails:Array<{ productId: number, quantity: number }> }= req.body;
    console.log(Productdetails, 'Detalles')

    try {
        const supplie = await suppliesModel.findByPk(supplieId);
        if (!supplie) {
            return res.status(404).json({msg: `Insumo con ID ${supplieId} no encontrado`,
        });
    }

    const newProductionOrder = await productionOrderModel.create({orderNumber,quantity,reasonCancellation,supplieId: supplie.getDataValue('id'), total:0,processId: process.getDataValue('id'),total:0});
    
    let productionOrdersDetails: any = [];
    let total = 0

    for (const productDetail of Productdetails) {

        console.log(productDetail, 'Porduct Detail Aqui')
        const product = await productModel.findByPk(productDetail.productId);
        if (!product) {
            return res.status(404).json({ msg: `Product with ID ${productDetail.productId} not found` });
        }
        if (productDetail.quantity > product.getDataValue('amount')) {
            return res.status(400).json({ msg: `Quantity exceeds available stock for product ID ${productDetail.productId}` });
        }

        product.setDataValue('amount', product.getDataValue('amount') - productDetail.quantity);
        await product.save();
        const subtotal = product.getDataValue('unitPrice') * productDetail.quantity;
        productionOrdersDetails = [...productionOrdersDetails, {
            saleId: newProductionOrder.getDataValue('id'),
            productId: productDetail.productId,
            quantity: productDetail.quantity,
            value: product.getDataValue('unitPrice'),
            subtotal: subtotal
        }];
    }

    console.log(productionOrdersDetails, 'Detal de ventas alla')

    // Crear los registros de detalles de venta en la base de datos
    await productionOrdersDetailsModel.bulkCreate(productionOrdersDetails);
    total = productionOrdersDetails.reduce((acc: number, detail: { subtotal: number }) => acc + detail.subtotal, 0);

    await newProductionOrder.update({ total: total });

    res.status(201).json({newProductionOrder, productionOrdersDetails, total});
} catch (error) {
    console.log(error);
    res.status(500).json({msg: error});
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

export const putProductionOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {orderNumber, quantity,reasonCancellation,processId } = req.body;
        const productionOrders = await productionOrderModel.findByPk(id);
        if (!productionOrders) {
            return res.status(404).json({ msg: 'ProductionOrder not found' });
        }
        await productionOrders.update({ orderNumber, quantity,reasonCancellation,processId});
        res.status(200).json({ productionOrders });
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
export const deleteProductionOrder= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productionOrders = await productionOrderModel.findByPk(id);
        if (!productionOrders) {
            return res.status(404).json({ msg: 'ProductionOrder not found' });
        }
        await productionOrders.destroy();
        res.status(200).json({ productionOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
    
};
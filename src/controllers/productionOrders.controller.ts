import {Response, Request} from "express";
import {productionOrderModel} from "../models/productionOrders.model";
import {optionsPagination} from 'generalTypes';
import {productModel} from "../models/products.model";
import {processesModel} from "../models/processes.model";
import {suppliesModel} from "../models/supplies.model";
import {productionOrdersDetailsModel} from "../models/productionOrdersDetails.model";
import { productionRequestModel } from "../models/productionRequests.model";

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

export const getProductionOrders = async (req: Request, res: Response) => {
    try {
        const {page, limit, order} = req.query;
        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            paginate: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        };
        const productionOrders = await productionOrderModel.findAndCountAll({
            limit: limit != 'ALL' ? options.limit : undefined,
            offset: options.limit * (options.page - 1),
            order: [options.order],
            include: [
                {
                    model: productionOrdersDetailsModel,
                    include: [

                        {
                            model: productModel,
                            attributes: ['id', 'name'],
                        }, {
                            model: suppliesModel,
                            attributes: ['id', 'name'],
                        },

                    ],
                }, {
                    model: processesModel,
                    as: 'process',
                    attributes: ['name']
                },
                {
                    model:suppliesModel,
                    attributes: ['id','name']
                }

            ],
        });
        res.status(200).json({productionOrders, options});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
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
export const getProductionOrder = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const productionOrder = await productionOrderModel.findByPk(id, {
            include: [
                {
                    model: productionOrdersDetailsModel,
                    as: 'productionOrdersDetails'
                }
            ]
        });
        if (!productionOrder) {
            return res.status(404).json({msg: 'productionOrder not found'});
        }
        res.status(200).json({productionOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
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

export const postProductionOrder = async (req: Request, res: Response) => {
    const { quantity, reasonCancellation, supplieId, processId}:
        {
            quantity: number,
            reasonCancellation: string,
            supplieId: number,
            processId: number,
        } = req.body;
    try {
        const finalProcessId = processId || 4;

        const process = await processesModel.findByPk(finalProcessId);
    if (!process) {
      return res.status(404).json({
        msg: `Proceso con ID ${finalProcessId} no encontrado`,
      });
    }
        const supplie = await suppliesModel.findByPk(supplieId);
        if (!supplie) {
            return res.status(404).json({
                msg: `Insumo con ID ${supplieId} no encontrado`,
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
        

        const newProductionOrder = await productionOrderModel.create({
            quantity,
            reasonCancellation,
            supplieId: supplie.getDataValue('id'),
            processId: process.getDataValue('id'),
            
        });
        
        res.status(201).json({newProductionOrder, message: 'Orden P. creada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const postProductionOrderDetail = async ( req: Request, res: Response )=> {
    const {Productdetails,productionOrderId}:
        {   
            productionOrderId: number,
            // Productdetails: Array<{ productId: number, quantity: number }>
            Productdetails: any[]
        } = req.body;

    console.log(Productdetails[0].Productdetails.quantity, 'Detalles')
    console.log(productionOrderId, 'ID' );


    try {
        
        const productionOrder = await productionOrderModel.findByPk(productionOrderId);
        if (!productionOrder) {
            return res.status(404).json({
                msg: `ProductionOrder con ID ${productionOrderId} no encontrado`,
            });
        }

        const newEmpaquetado = await productionOrdersDetailsModel.create({
            productionOrderId: productionOrder.getDataValue('id'),
            productId: Productdetails[0].Productdetails.productId,
            quantity: Productdetails[0].Productdetails.quantity,
        });

        let productionOrdersDetails: any = [];

        for (const productDetail of Productdetails) {

            console.log(productDetail, 'Porduct Detail Aqui')
            const product = await productModel.findByPk(productDetail.Productdetails.productId);
            if (!product) {
                return res.status(404).json({msg: `Product with ID ${productDetail.productId} not found`});
            }
            if (productDetail.quantity > product.getDataValue('stockMax')) {
                return res.status(400).json({msg: `Quantity exceeds available stockMax for product ID ${productDetail.productId}`});
            }  
            const currentQuantity = productionOrder.getDataValue('quantity');
            if (currentQuantity === null || currentQuantity === undefined) {
                console.error('La cantidad de la orden de producción no está definida');
                    return res.status(400).json({msg: 'La cantidad de la orden de producción no está definida'});
                }
                const updatedQuantity = currentQuantity - (product.getDataValue('amountSupply') * productDetail.Productdetails.quantity);
                if (updatedQuantity < 0) {
                    return res.status(400).json({msg: `La cantidad excede el insumo disponible ${productDetail.productId}`});
                }
                if (isNaN(updatedQuantity) || updatedQuantity < 0) {
                    console.error('La cantidad actualizada no es válida');
                    return res.status(400).json({msg: 'La cantidad actualizada no es válida'});
                }
                await productionOrder.update({quantity: updatedQuantity });
                product.setDataValue('amount', product.getDataValue('amount') + productDetail.Productdetails.quantity);
            
            await product.save();
            productionOrdersDetails = [...productionOrdersDetails, {
                Id: newEmpaquetado.getDataValue('id'),
                productionOrderId: productionOrder.getDataValue('id'),
                productId: productDetail.Productdetails.productId,
                quantity: productDetail.Productdetails.quantity,
            }];
        }
        

        console.log(productionOrdersDetails, 'Detal de empaquetado alla')

        await productionOrdersDetailsModel.bulkCreate(productionOrdersDetails);

        res.status(201).json({productionOrdersDetails, message: 'Empaquetado creado correctamente'});
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
        const {id} = req.params;
        const {processId} = req.body;
        const productionOrders = await productionOrderModel.findByPk(id);
        if (!productionOrders) {
            return res.status(404).json({msg: 'ProductionOrder not found'});
        }
        await productionOrders.update({processId});
        console.log(processId,'aquí está el proceso................................................')
        
        res.status(200).json({productionOrders});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
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
export const deleteProductionOrder = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const productionOrder = await productionOrderModel.findByPk(id);
        if (!productionOrder) {
            return res.status(404).json({msg: 'ProductionOrder not found'});
        }
        await productionOrder.update({state: !productionOrder.getDataValue('state')});
        res.status(200).json({productionOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }

};

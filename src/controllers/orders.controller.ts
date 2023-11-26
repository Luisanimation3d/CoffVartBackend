import { Response, Request } from "express";
import { ordersModel } from "../models/orders.model";
import { ordersderailsModel } from "../models/ordersderails.model";
import { productModel } from "../models/products.model";
import { coustumersModel } from "../models/coustomers.model";
import { optionsPagination } from '../types/generalTypes';

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


export const getOrders = async (req: Request, res: Response) => {
    try {
        const {page, limit, order} = req.query;
        const options : optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
			paginate: parseInt(limit as string, 10) || 10,
			order: order ? JSON.parse(order as string) : ['id', 'ASC'],
		};
        const orders= await ordersModel.findAndCountAll({
            limit: options.limit,
			offset: options.limit * (options.page - 1),
			order: [options.order],
            include: [
                {
                    model: ordersderailsModel,
                    // Get name of the permissions associated with the role
                    include: [
                        {
                            model: productModel,
                            attributes: ['id', 'name'],
                        },
                    {
                        model: coustumersModel,
                        attributes: ['id', 'name'],
                    }
                    ],
                },
            ],
        });
        res.status(200).json({ orders, options });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await ordersModel.findByPk(id, {
        include: [
            {
                model: ordersderailsModel,
                as: 'orderDetails',
            },
        ],
    });
    if (!order) {
        return res.status(404).json({ msg: 'order not found' });
    }
    res.status(200).json({ order });
};

export const postOrder = async (req: Request, res: Response) => {
    const { code, state, coustumerId, products, quantities } = req.body;
    try{
        const coustumer = await coustumersModel.findByPk(coustumerId);

        if(!coustumer){
            return res.status(404).json({msg: 'Coustumer not found'})
        }
        const newOrder = await ordersModel.create({ code, state, customerId: coustumer.getDataValue('id'), total: 0});
        const orderDetails = [];
        for (let i= 0; i< products.length; i++){
            const productId= products[i];
            const quantity = quantities[i];

            const product = await productModel.findByPk(productId);
            

            if(!product){
                return res.status(404).json({msg: 'Product not found'})
            }
            if(quantity > product.getDataValue('amount')){
                return res.status(400).json({msg: `Product ${product.getDataValue('name')} doesn't have enough stock`})
            }
            const subtotal = product.getDataValue('unitPrice') * quantity;
            const orderDetail={
                orderId: newOrder.getDataValue('id'),
                productId: productId,
                quantity: quantity,
                value: product.getDataValue('unitPrice'), 
                subtotal: subtotal
            };
            orderDetails.push(orderDetail);

            product.setDataValue('amount', product.getDataValue('amount') - quantity);
            await product.save();
        }

        await ordersderailsModel.bulkCreate(orderDetails);
        const total = orderDetails.reduce((acc, orderDetail) => acc + orderDetail.subtotal, 0);
        await newOrder.update({total: total});

        res.status(201).json({newOrder, orderDetails, total});
    } catch(error){
        console.log(error);
        res.status(500).json({msg: error})
    }
};


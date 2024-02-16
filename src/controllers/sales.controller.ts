import {Response, Request} from "express";
import {salesModel} from "../models/sales.model";
import {salesdetailsModel} from "../models/salesdetails.model";
import {productModel} from "../models/products.model";
import {coustumersModel} from "../models/coustomers.model";
import {optionsPagination} from 'generalTypes';
import {userModel} from "../models/users.model";

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


export const getSales = async (req: Request, res: Response) => {
    try {
        const {page, limit, order} = req.query;
        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            paginate: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        };
        const sales = await salesModel.findAndCountAll({
            limit: options.limit,
            offset: options.limit * (options.page - 1),
            order: [options.order],
            include: [
                {
                    model: salesdetailsModel,
                    // Get name of the permissions associated with the role
                    include: [
                        {
                            model: productModel,
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: coustumersModel,
                    as: 'coustumer',
                    attributes: [ 'id', 'name'],
                }
            ],
        });
        res.status(200).json({sales, options});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

export const getSale = async (req: Request, res: Response) => {
    const {id} = req.params;
    const sale = await salesModel.findByPk(id, {
        include: [
            {
                model: salesdetailsModel,
                as: 'saleDetails',
            },
        ],
    });
    if (!sale) {
        return res.status(404).json({msg: 'sale not found'});
    }
    res.status(200).json({sale});
};

/*export const postSale = async (req: Request, res: Response) => {
    const { invoice, state, customer, products, quantities, total } = req.body;

    try {
        // Crear una nueva venta
        const newSale = await salesModel.create({ invoice, state, total });

        // Crear una lista para guardar los detalles de la venta
        const saleDetails = [];

        // Iterar a través de los productos y cantidades
        for (let i = 0; i < products.length; i++) {
            const productId = products[i];
            const quantity = quantities[i];

            // Obtener el producto por su ID
            const product = await productModel.findByPk(productId);

            if (!product) {
                return res.status(404).json({ msg: `Product with ID ${productId} not found` });
            }

            if (quantity > product.getDataValue('amount')) {
                return res.status(400).json({ msg: `Quantity exceeds available stock for product ID ${productId}` });
            }

            // Crear un registro de detalle de venta
            const saleDetail = {
                saleId: newSale.getDataValue('id'),
                customerId: customer,
                productId: productId,
                quantity: quantity,
                value: total, // Aquí usamos el total proporcionado en la solicitud
            };

            // Agregar el detalle a la lista
            saleDetails.push(saleDetail);

            // Actualizar la cantidad de productos disponibles
            product.setDataValue('amount', product.getDataValue('amount') - quantity);
            await product.save();
        }

        // Crear los registros de detalles de venta en la base de datos
        await salesdetailsModel.bulkCreate(saleDetails);

        res.status(201).json({ newSale, saleDetails, total });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};*/
export const postSale = async (req: Request, res: Response) => {
    const { invoice, state, user, Productdetails }: { invoice: string, state: boolean, user: string, Productdetails: Array<{ productId: number, quantity: number }> } = req.body;
    console.log(Productdetails, 'Detalles')

    try {
        const userId = await userModel.findOne({ where: { email: user } });
        // Obtener el cliente por su ID
        const coustumer = await coustumersModel.findOne({ where: { userId: userId?.getDataValue('id') } });

        if (!coustumer) {
            return res.status(404).json({ msg: `Customer with ID ${userId} not found` });
        }

        // Crear una nueva venta con el cliente asociado
        const newSale = await salesModel.create({ invoice, state, customerId: coustumer.getDataValue('id'), total: 0 });

        // Crear una lista para guardar los detalles de la venta
        let saleDetails: any = [];
        let total= 0

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
            saleDetails = [...saleDetails, {
                saleId: newSale.getDataValue('id'),
                productId: productDetail.productId,
                quantity: productDetail.quantity,
                value: product.getDataValue('unitPrice'),
                subtotal: subtotal
            }];
        }

        console.log(saleDetails, 'Detal de ventas alla')

        // Crear los registros de detalles de venta en la base de datos
        await salesdetailsModel.bulkCreate(saleDetails);
        total = saleDetails.reduce((acc: number, detail: { subtotal: number }) => acc + detail.subtotal, 0);

        await newSale.update({ total: total });

        res.status(201).json({newSale, saleDetails, total});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

export const putSales= async (req: Request, res: Response) => {
    try{
    const { id } = req.params;
    const { state } = req.body;
    const sales = await salesModel.findByPk(id);
    if (!sales) {
        return res.status(404).json({ msg: 'sale not found' });
    }
    await sales.update({ state });
    res.status(200).json({ sales });
}catch (error){
    console.log(error);
    res.status(500).json({msg:error});
}
}

export const deleteSales= async (req: Request, res: Response) => {
    const { id } = req.params;
    const sales = await salesModel.findByPk(id);
    if (!sales) {
        return res.status(404).json({ msg: 'sale not found' });
    }
    sales.update({state: !sales.getDataValue('state')});
    res.status(200).json({ sales });
}



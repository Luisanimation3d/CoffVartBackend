import {Response, Request} from "express";
import {shopdetailsModel} from "../models/shopdetails.model";
import {suppliesModel} from "../models/supplies.model";
import {supplierModel} from "../models/suppliers.model";
import {optionsPagination} from 'generalTypes';
import { shopModel } from "../models/shops.model";

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


export const getShops = async (req: Request, res: Response) => {
    try {
        const {page, limit, order} = req.query;
        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            paginate: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        };
        const shops = await shopModel.findAndCountAll({
            limit: options.limit,
            offset: options.limit * (options.page - 1),
            order: [options.order],
            include: [
                {
                    model: shopdetailsModel,
                    // Get name of the permissions associated with the role
                    include: [
                        {
                            model: suppliesModel,
                            attributes: ['id', 'name'],
                        },
                        {
                            model: suppliesModel,
                            attributes: ['id', 'name'],
                        }
                    ],
                },
                {
                   model: supplierModel,
                    as: 'supplier',
                    attributes: ['id', 'name'],
                },
            ],
        });
        res.status(200).json({shops, options});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

export const getShop = async (req: Request, res: Response) => {
    const {id} = req.params;
    const shop = await shopModel.findByPk(id, {
        include: [
            {
                model: shopdetailsModel,
                as: 'shopdetails',
            },
        ],
    });
    if (!shop) {
        return res.status(404).json({msg: 'Shop not found'});
    }
    res.status(200).json({shop});
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
export const postShop = async (req: Request, res: Response) => {
    const { invoice, state, date, description, supplierId, Suppliesdetails }: { invoice: string, state: boolean, date: string, description: string, supplierId: number, Suppliesdetails: Array<{ supplyId: number, quantity: number, value: number }> } = req.body;
    console.log(Suppliesdetails, 'Detalles')

    try {
        // Obtener el cliente por su ID
        const supplier = await supplierModel.findByPk(supplierId);

        if (!supplier) {
            return res.status(404).json({ msg: `Supplier with ID ${supplierId} not found` });
        }

        // Crear una nueva venta con el cliente asociado
        const newShop = await shopModel.create({ invoice, state, date, description, supplierId: supplier.getDataValue('id'), total: 0 });

        // Crear una lista para guardar los detalles de la venta
        let shopDetails: any = [];
        let total= 0

        for (const supplyDetail of Suppliesdetails) {

            console.log(supplyDetail, 'Supply Detail Aqui')
            const supply = await suppliesModel.findByPk(supplyDetail.supplyId);
            if (!supply) {
                return res.status(404).json({ msg: `Supply with ID ${supplyDetail.supplyId} not found` });
            }

            supply.setDataValue('amount', supply.getDataValue('amount') + supplyDetail.quantity);
            supply.setDataValue('unitPrice', supplyDetail.value);
            await supply.save();
            const subtotal = supplyDetail.value * supplyDetail.quantity;
            shopDetails = [...shopDetails, {
                shopId: newShop.getDataValue('id'),
                supplyId: supplyDetail.supplyId,
                quantity: supplyDetail.quantity,
                value: supplyDetail.value,
                subtotal: subtotal
            }];
        }

      

        console.log(shopDetails, 'Detal de compras alla')

        // Crear los registros de detalles de venta en la base de datos
        await shopdetailsModel.bulkCreate(shopDetails);
        total = shopDetails.reduce((acc: number, detail: { subtotal: number }) => acc + detail.subtotal, 0);

        await newShop.update({ total: total });

        res.status(201).json({newShop, shopDetails, total, message: 'Compra creada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
};

export const deleteShop= async (req: Request, res: Response) => {
    const { id } = req.params;
	const shop = await shopModel.findByPk(id);
	if (!shop) {
		return res.status(404).json({ msg: 'Shop not found' });
	}
	shop.update({ state: !shop.getDataValue('state') });
	res.status(200).json({ shop });
};


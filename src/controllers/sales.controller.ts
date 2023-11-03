import { Response, Request } from "express";
import { salesModel } from "../models/sales.model";
import { salesdetailsModel } from "../models/salesdetails.model";
import { productModel } from "../models/products.model";
import { coustumersModel } from "../models/coustomers.model";


export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await salesModel.findAll({
            include: [
                {
                    model: salesdetailsModel,
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
        res.status(200).json({ sales });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

export const getSale = async (req: Request, res: Response) => {
    const { id } = req.params;
    const sale = await salesModel.findByPk(id, {
        include: [
            {
                model: salesdetailsModel,
                as: 'saleDetails',
            },
        ],
    });
    if (!sale) {
        return res.status(404).json({ msg: 'sale not found' });
    }
    res.status(200).json({ sale });
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
    const { invoice, state, coustumerId, products, quantities, total } = req.body;

    try {
        // Obtener el cliente por su ID
        const coustumer = await coustumersModel.findByPk(coustumerId);

        if (!coustumer) {
            return res.status(404).json({ msg: `Customer with ID ${coustumerId} not found` });
        }

        // Crear una nueva venta con el cliente asociado
        const newSale = await salesModel.create({ invoice, state, total, coustumerId: coustumer.getDataValue('id')});

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

            // Calcular el subtotal para este producto

            // Crear un registro de detalle de venta
            const saleDetail = {
                saleId: newSale.getDataValue('id'),
                productId: productId,
                quantity: quantity,
                value: total, // Ajusta el valor del detalle según tus necesidades
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
};



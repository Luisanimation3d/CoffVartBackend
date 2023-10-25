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

export const postSale = async (req: Request, res: Response) => {
    const { invoice, state, coustumer, products, quantities } = req.body;
    console.log(req.body);
    try {
        // Crear una nueva venta
        const newSale = await salesModel.create({ invoice, state });

        // Crear una lista para guardar los detalles de la venta
        const saleDetails = [];

        console.log('antes de ingresar al for')
        console.log(products)
        console.log(quantities)
        console.log(typeof products)
        console.log(typeof quantities)

        // Iterar a través de los productos y cantidades
        for (let i = 0; i < products.length; i++) {
            const productId = products[i];
            const quantity = quantities[i];
            console.log('entro al for')
            console.log(productId)
            console.log(quantity)

            // Obtener el producto por su ID
            const product = await productModel.findByPk(productId);

            console.log(product)

            if (!product) {
                return res.status(404).json({ msg: `Product with ID ${productId} not found` });
            }

            if (quantity > product.getDataValue('amount')) {
                return res.status(400).json({ msg: `Quantity exceeds available stock for product ID ${productId}` });
            }

            // Calcular el subtotal para este producto
            const subtotal = product.getDataValue('unitPrice') * quantity;

            // Crear un registro de detalle de venta
            const saleDetail = {
                saleId: newSale.getDataValue('id'),
                customerId: coustumer,
                productId: productId,
                quantity: quantity,
                value: subtotal,
            };

            // Agregar el detalle a la lista
            saleDetails.push(saleDetail);

            // Actualizar la cantidad de productos disponibles
            product.setDataValue('amount', product.getDataValue('amount') - quantity);
            await product.save();
        }

        // Crear los registros de detalles de venta en la base de datos
        await salesdetailsModel.bulkCreate(saleDetails);

        // Calcular el total de la venta sumando los subtotales de los productos
        const total = saleDetails.reduce((acc, saleDetail) => acc + saleDetail.value, 0);

        // Actualizar el total de la venta en la base de datos
        

        res.status(201).json({ newSale, saleDetails, total});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

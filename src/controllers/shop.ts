import { Response, Request } from "express";
import { shopdetailsModel } from "../models/shopdetails.model";
import { suppliesModel } from "../models/supplies.model";
import { shopModel } from "../models/shops.model";
import { supplierModel } from "../models/suppliers.model";



export const getShop = async (req: Request, res: Response) => {
    try {
        const shop = await shopModel.findAll({
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
                            model: supplierModel,
                            attributes: ['id', 'name'],
                        }
                    ],
                },
            ],
        });
        res.status(200).json({ shop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

export const getShops = async (req: Request, res: Response) => {
    const { id } = req.params;
    const shop = await shopModel.findByPk(id, {
        include: [
            {
                model: shopdetailsModel,
                as: 'shopDetails',
            },
        ],
    });
    if (!shop) {
        return res.status(404).json({ msg: 'Shop not found' });
    }
    res.status(200).json({ shop });
};

export const postShop = async (req: Request, res: Response) => {
    const { invoice, supplier, state, supplies, quantities } = req.body;
    console.log(req.body);
    try {
        // Crear una nueva venta
        const newShop = await shopModel.create({ invoice, state });

        // Crear una lista para guardar los detalles de la venta
        const shopDetails = [];

        console.log('antes de ingresar al for')
        console.log(supplies)
        console.log(quantities)
        console.log(typeof supplies)
        console.log(typeof quantities)

        // Iterar a través de los productos y cantidades
        for (let i = 0; i < supplies.length; i++) {
            const suppliesId = supplies[i];
            const quantity = quantities[i];
            console.log('entro al for')
            console.log(suppliesId)
            console.log(quantity)

            // Obtener el producto por su ID
            const supplie = await suppliesId.findByPk(suppliesId);

            console.log(supplies)

            if (!supplies) {
                return res.status(404).json({ msg: `Supplies with ID ${suppliesId} not found` });
            }

            if (quantity > supplies.getDataValue('amount')) {
                return res.status(400).json({ msg: `Quantity exceeds available stock for supplies ID ${suppliesId}` });
            }

            // Calcular el subtotal para este producto
            const subtotal = supplies.getDataValue('unitPrice') * quantity;

            // Crear un registro de detalle de venta
            const shopDetail = {
                shopId: newShop.getDataValue('id'),
                supplierId: supplier,
                supplies: suppliesId,
                quantity: quantity,
                total: subtotal,
            };

            // Agregar el detalle a la lista
            shopDetails.push(shopDetail);

            // Actualizar la cantidad de productos disponibles
            supplies.setDataValue('amount', supplies.getDataValue('amount') - quantity);
            await supplies.save();
        }

        // Crear los registros de detalles de venta en la base de datos
        await shopdetailsModel.bulkCreate(shopDetails);

        // Calcular el total de la venta sumando los subtotales de los productos
        const total = shopDetails.reduce((acc, shopDetail) => acc + shopDetail.total, 0);

        // Actualizar el total de la venta en la base de datos
        

        res.status(201).json({ newShop, shopDetails, total});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};


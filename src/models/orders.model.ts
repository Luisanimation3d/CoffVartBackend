import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { coustumersModel } from "./coustomers.model";
import { productModel } from "./products.model";

export const ordersModel = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nit: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: true
})
ordersModel.belongsTo(coustumersModel, { foreignKey: 'coustumer_id', targetKey: 'id' })
ordersModel.belongsTo(productModel, { foreignKey: 'product_id', targetKey: 'id' })
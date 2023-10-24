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
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
     },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    document: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: true
})

coustumersModel.belongsToMany(productModel, { through: ordersModel });
productModel.belongsToMany(coustumersModel, { through: ordersModel });
import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { coustumersModel } from "./coustomers.model";
import { productModel } from "./products.model";
import { ordersderailsModel } from "./ordersderails.model";

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
    total:{
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['anulado', 'pendiente', 'confirmado']],
        },
      },
},
{
    timestamps: true
})

ordersModel.hasMany(ordersderailsModel, {
    foreignKey: 'orderId',
    sourceKey: 'id'
})

ordersderailsModel.belongsTo(ordersModel, {
    foreignKey: 'orderId',
    targetKey: 'id'
});
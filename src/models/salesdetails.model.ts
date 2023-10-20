import {DataTypes} from "sequelize"
import { sequelize } from "../database/config"
import { salesModel } from "./sales.model"
import { productModel } from "./products.model"

export const salesdetailsModel = sequelize.define('salesdetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    }
},
{
    timestamps: true
})
salesdetailsModel.belongsTo(salesModel, { foreignKey: 'sale_id', targetKey: 'id' })
salesdetailsModel.belongsTo(productModel, { foreignKey: 'product_id', targetKey: 'id' })
import { DataTypes} from "sequelize"
import { sequelize } from "../database/config"
import { ordersModel } from "./orders.model"
import { productModel } from "./products.model"

export const ordersderailsModel = sequelize.define('ordersderails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: true
})
ordersModel.belongsToMany(productModel, { through: ordersderailsModel });
productModel.belongsToMany(ordersModel, { through: ordersderailsModel });
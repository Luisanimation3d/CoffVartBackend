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

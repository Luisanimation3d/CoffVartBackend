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
ordersderailsModel.belongsTo(ordersModel, { foreignKey: 'order_id', targetKey: 'id' })
ordersderailsModel.belongsTo(productModel, { foreignKey: 'product_id', targetKey: 'id' })
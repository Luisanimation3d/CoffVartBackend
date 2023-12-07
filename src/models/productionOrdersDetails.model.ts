import {DataTypes} from "sequelize"
import { sequelize } from "../database/config"

export const productionOrdersDetailsModel = sequelize.define('productionOrdersDetails', {
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

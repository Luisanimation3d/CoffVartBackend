import {DataTypes} from "sequelize"
import { sequelize } from "../database/config"


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


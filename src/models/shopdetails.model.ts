import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";



export const shopdetailsModel = sequelize.define('shopdetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    iva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totaliva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
},
{
    timestamps: true
})
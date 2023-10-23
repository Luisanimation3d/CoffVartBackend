import {DataTypes} from "sequelize"
import { sequelize } from "../database/config"
import { salesdetailsModel } from "./salesdetails.model"

export const salesModel = sequelize.define('sales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoice: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},
{
    timestamps: true
})


salesdetailsModel.belongsTo(salesModel, {
    foreignKey: 'saleId',
    targetKey: 'id'
    })

salesModel.hasMany(salesdetailsModel, {
    foreignKey: 'saleId',
    sourceKey: 'id'
    })



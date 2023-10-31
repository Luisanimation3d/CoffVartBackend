import { DataTypes } from "sequelize"
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
    total:{
        type: DataTypes.FLOAT(10, 2),
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

salesModel.hasMany(salesdetailsModel, {
    foreignKey: 'saleId',
    sourceKey: 'id'
})

salesdetailsModel.belongsTo(salesModel, {
    foreignKey: 'saleId',
    targetKey: 'id'
})




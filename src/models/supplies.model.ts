import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { shopdetailsModel } from "./shopdetails.model";
import { productionOrdersDetailsModel } from "./productionOrdersDetails.model";


export const suppliesModel = sequelize.define('supplies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
})

suppliesModel.hasMany(shopdetailsModel, {
    foreignKey: 'supplyId',
    sourceKey: 'id'
})

shopdetailsModel.belongsTo(suppliesModel, {
    foreignKey: 'supplyId',
    targetKey: 'id'
})
suppliesModel.hasMany(productionOrdersDetailsModel, {
    foreignKey: 'supplyId',
    sourceKey: 'id'
})

productionOrdersDetailsModel.belongsTo(suppliesModel, {
    foreignKey: 'supplyId',
    targetKey: 'id'
})
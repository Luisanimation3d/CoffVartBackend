import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { suppliesModel } from "./supplies.model";
import { productModel } from "./products.model";
import { processesModel } from "./processes.model";
import { productionOrdersDetailsModel } from "./productionOrdersDetails.model";
import { productionRequestModel } from "./productionRequests.model";

export const productionOrderModel = sequelize.define('productionOrders',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    reasonCancellation: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
},{
    timestamps: true
});
suppliesModel.hasOne(productionOrderModel,{
    foreignKey: 'supplieId',
    sourceKey: 'id'
});

productionOrderModel.belongsTo(suppliesModel,{
    foreignKey: 'supplieId',
    targetKey: 'id'
});
processesModel.hasOne(productionOrderModel,{
    foreignKey: 'processId',
    sourceKey: 'id'
});

productionOrderModel.belongsTo(processesModel,{
    foreignKey: 'processId',
    targetKey: 'id'
});

productionOrderModel.hasMany(productionOrdersDetailsModel, {
	foreignKey: 'productionOrderId',
	sourceKey: 'id',
});

productionOrdersDetailsModel.belongsTo(productionOrderModel, {
	foreignKey: 'productionOrderId',
	targetKey: 'id',
});
productionRequestModel.hasOne(productionOrderModel,{
    foreignKey: 'productionRId',
    sourceKey: 'id'
});

productionOrderModel.belongsTo(productionRequestModel,{
    foreignKey: 'productionRId',
    targetKey: 'id'
});


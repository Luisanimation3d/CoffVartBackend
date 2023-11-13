import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { processModel } from "./process.model";
import { productionOrderModel } from "./productionOrders.model";
import { productionRequestModel } from "./productionRequest.model";


export const processDetailModel = sequelize.define('processDetail',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
},{
    timestamps: true
})
processModel.hasOne(processDetailModel,{
    foreignKey: 'processId',
    sourceKey: 'id',
});
processDetailModel.belongsTo(processModel,{
    foreignKey: 'processId',
    targetKey: 'id',
});
productionOrderModel.hasOne(processDetailModel,{
    foreignKey: 'productionOrderId',
    sourceKey: 'id',
});
processDetailModel.belongsTo(productionOrderModel,{
    foreignKey: 'productionOrderId',
    targetKey: 'id',
});
productionRequestModel.hasOne(processDetailModel,{
    foreignKey: 'productionRequestId',
    sourceKey: 'id',
});
processDetailModel.belongsTo(productionRequestModel,{
    foreignKey: 'productionRequestId',
    targetKey: 'id',
});
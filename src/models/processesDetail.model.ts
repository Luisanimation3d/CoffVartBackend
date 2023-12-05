import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { processesModel } from "./processes.model";
import { productionOrderModel } from "./productionOrders.model";
import { productionRequestModel } from "./productionRequests.model";


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
processesModel.hasOne(processDetailModel,{
    foreignKey: 'processId',
    sourceKey: 'id',
});
processDetailModel.belongsTo(processesModel,{
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
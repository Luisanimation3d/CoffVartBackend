import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { suppliesModel } from "./supplies.model";
import { productModel } from "./products.model";
import { processesModel } from "./processes.model";

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
})
suppliesModel.hasOne(productionOrderModel,{
    foreignKey: 'supplieId',
    sourceKey: 'id',
});
productionOrderModel.belongsTo(suppliesModel,{
    foreignKey:'supplie_id',
    targetKey:'id'});
productionOrderModel.hasMany(productModel,{
    foreignKey:'productionOrder_id',
    sourceKey:'id'});
productModel.belongsTo(productionOrderModel,{
    foreignKey:'productionOrder_id',
    targetKey:'id'});
processesModel.hasOne(productionOrderModel,{
    foreignKey: 'processId',
    sourceKey: 'id',
});
    
productionOrderModel.belongsTo(processesModel,{
    foreignKey: 'processId',
    targetKey: 'id',
});
    


    

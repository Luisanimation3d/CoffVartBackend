import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";
import { companyModel } from "./companys.model";
import { suppliesModel } from "./supplies.model";
import { productModel } from "./products.model";

export const productionOrderModel = sequelize.define('productionOrders',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    initialWeight: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    finalWeight: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true
    },
    process: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    orderState: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    reasonCancellation: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
    observations: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
    productQuality: {
        type: DataTypes.STRING(255),
        allowNull:true
    },
},{
    timestamps: true
})
productionOrderModel.belongsTo(companyModel,{foreignKey:'company_id',targetKey:'id'});
productionOrderModel.belongsTo(suppliesModel,{foreignKey:'supplie_id',targetKey:'id'});
productionOrderModel.hasMany(productModel,{foreignKey:'product_id',sourceKey:'id'});
productModel.belongsTo(productionOrderModel,{foreignKey:'productionOrder_id',targetKey:'id'});

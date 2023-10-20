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
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    initialWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    finalWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    process: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    orderState: {
        type: DataTypes.BOOLEAN,
    },
    reasonCancellation: {
        type: DataTypes.STRING(500),
        allowNull:false
    },
    observations: {
        type: DataTypes.STRING(500),
        allowNull:false
    },
    productQuality: {
        type: DataTypes.STRING(255),
        allowNull:false
    },
},{
    timestamps: true
})
productionOrderModel.belongsTo(companyModel,{foreignKey:'company_id',targetKey:'id'});
productionOrderModel.belongsTo(suppliesModel,{foreignKey:'supplie_id',targetKey:'id'});
productionOrderModel.hasMany(productModel,{foreignKey:'product_id',sourceKey:'id'});
productModel.belongsTo(productionOrderModel,{foreignKey:'productionOrder_id',targetKey:'id'});

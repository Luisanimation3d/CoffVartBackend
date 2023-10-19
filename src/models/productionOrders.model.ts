import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";

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
    company: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    supplie: {
        type: DataTypes.STRING(255),
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
    product:{
        type: DataTypes.STRING(255),
        allowNull:false
    },
    productQuality: {
        type: DataTypes.STRING(255),
        allowNull:false
    },
},{
    timestamps: true
})
productionOrderModel.belongsTo(companysModel,{foreignKey:'company_id',targetKey:'id'});
productionOrderModel.belongsTo(suppliesModel,{foreignKey:'supplie_id',targetKey:'id'});
productionOrderModel.hasMany(productsModel,{foreignKey:'product_id',sourceKey:'id'});
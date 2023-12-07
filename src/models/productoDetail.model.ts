import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { suppliesModel } from "./supplies.model";
import { salesdetailsModel } from "./salesdetails.model";
import { ordersderailsModel } from "./ordersderails.model";
import { productionOrdersDetailsModel } from "./productionOrdersDetails.model";


export const productModel = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate: {
        type: DataTypes.STRING,
        allowNull: false
    },  

},
{
    timestamps: true
})

productModel.hasMany(salesdetailsModel, {
    foreignKey: 'productId',
    sourceKey: 'id'
    })
salesdetailsModel.belongsTo(productModel, {
    foreignKey: 'productId',
    targetKey: 'id'
    })

productModel.hasMany(ordersderailsModel, {
    foreignKey: 'productId',
    sourceKey: 'id'
    });

ordersderailsModel.belongsTo(productModel, {
    foreignKey: 'productId',
    targetKey: 'id'
    });
productModel.hasMany(productionOrdersDetailsModel, {
        foreignKey: 'productId',
        sourceKey: 'id'
        });
    
productionOrdersDetailsModel.belongsTo(productModel, {
        foreignKey: 'productId',
        targetKey: 'id'
        });
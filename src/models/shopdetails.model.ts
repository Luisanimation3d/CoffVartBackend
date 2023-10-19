import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { supplierModel } from "./suppliers.model";
import { shopModel } from "./shops.model";
import { suppliesModel } from "./supplies.model";



export const shopdetailsModel = sequelize.define('shopdetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    iva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totaliva: {
        type: DataTypes.FLOAT,
        allowNull: false
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
shopdetailsModel.belongsTo(shopModel, { foreignKey: 'shopdetails_id', targetKey: 'id' });
shopdetailsModel.belongsTo(supplierModel, { foreignKey: 'shopdetails_id', targetKey: 'id' });
shopdetailsModel.hasMany(suppliesModel, { foreignKey: 'shop_id', sourceKey: 'id' });
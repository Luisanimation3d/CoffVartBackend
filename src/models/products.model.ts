import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { suppliesModel } from "./supplies.model";


export const productModel = sequelize.define('product', {
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
        allowNull: false
    },
    stockMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stockMax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
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
productModel.hasMany(suppliesModel, { foreignKey: 'product_id', sourceKey: 'id' });
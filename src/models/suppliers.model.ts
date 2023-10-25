import {DataTypes} from "sequelize";
import {sequelize} from "../database/config";

export const supplierModel = sequelize.define('suppliers',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    coffeType: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quality: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    unitCost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    timestamps: true
})
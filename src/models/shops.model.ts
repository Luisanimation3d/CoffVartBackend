import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

export const shopModel = sequelize.define('shop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
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


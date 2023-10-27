import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

export const tokenModel = sequelize.define(
    "tokens",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);
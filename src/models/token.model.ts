import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

/* The code is defining a Sequelize model called `tokenModel` for a table named "tokens" in the
database. The model has two columns: "id" and "token". */
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
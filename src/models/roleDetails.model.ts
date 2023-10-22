import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

export const roleDetailsModel = sequelize.define('rol_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
})
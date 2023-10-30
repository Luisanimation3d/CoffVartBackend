import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

/* The code `export const roleDetailsModel = sequelize.define('rol_details', { ... })` is defining a
Sequelize model called `roleDetailsModel` for a table named `'rol_details'`. */
export const roleDetailsModel = sequelize.define('rol_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
})